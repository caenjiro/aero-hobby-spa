sequenceDiagram
    participant Medico
    participant Gateway
    participant Auth
    participant MSCitas
    participant MSDoc
    participant Blob
    participant Mottor
    participant Notificador
    participant Farmaceutico
    participant Mfarm
    participant Farmacia
    participant Paciente

    %% 1. Autenticación
    Medico->>Gateway: POST /api/citas/completar (Bearer JWT)
    Gateway->>Auth: Valida Token & Roles (Claim: Medico)
    Auth-->>Gateway: Token válido (id_usuario, rol)

    %% 2. Completar Cita
    Gateway->>MSCitas: Ejecutar atención (id_cita, id_medico, diagnóstico)
    MSCitas->>MSCitas: UPDATE CITA SET estado = 'COMPLETADA'

    %% 3. Generación de Receta y Documentos
    MSCitas->>MSDoc: POST /api/documentos (Generar receta para id_afiliado)
    MSDoc->>Blob: Sube PDF receta médica
    Blob-->>MSDoc: Retorna URL de descarga
    MSDoc->>MSDoc: INSERT INTO DOCUMENTO (url_blob, hash, tipo='RECETA')
    MSDoc->>Mottor: Publica evento "DocumentoDisponible" (id_documento, id_afiliado)

    %% 4. Consumo Asíncrono de Eventos
    par Despacho en Farmacia
        Mottor->>Mfarm: Evento "DocumentoDisponible"
        Mfarm->>Mfarm: Valida stock de medicamentos requeridos
    and Notificación al Paciente
        Mottor->>Notificador: Evento "DocumentoDisponible"
        Notificador->>Medico: Envía Email/Push con enlace seguro a la receta
    end

    %% 5. Dispensación en Farmacia
    actor Farmaceutico as Personal Farmacia
    Farmaceutico->>Gateway: POST /api/farmacia/despachar (id_documento_receta)
    Gateway->>Mfarm: Procesar entrega
    Mfarm->>Mfarm: INSERT DESPACHO, UPDATE MEDICAMENTO (stock_disponible - cantidad)
    Mfarm->>Mottor: Publica evento "DespachoConfirmado" (id_despacho)
    Mottor->>Notificador: Evento "DespachoConfirmado"
    Notificador->>Medico: Notifica retiro exitoso de fármacos
    Gateway->>MSFarm: Procesar entrega
    MSFarm->>MSFarm: INSERT DESPACHO, UPDATE MEDICAMENTO (stock_disponible - cantidad)
    MSFarm->>Rabbit: Publica evento "DespachoConfirmado" (id_despacho)
    Rabbit->>MSNotif: Evento "DespachoConfirmado"
    MSNotif->>Medico: Notifica retiro exitoso de fármacos
