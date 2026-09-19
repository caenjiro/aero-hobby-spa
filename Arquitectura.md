sequenceDiagram
    autonumber
    actor Medico as Médico / Afiliado
    participant Gateway as Envoy Ingress (API Gateway)
    participant Auth as MS Autenticación / Entra
    participant MSCitas as MS Citas (db_citas)
    participant MSDoc as MS Documentos (db_documentos)
    participant Blob as Azure Blob Storage
    participant Rabbit as Broker RabbitMQ
    participant MSFarm as MS Farmacia (db_farmacia)
    participant MSNotif as MS Notificaciones

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
    MSDoc->>Rabbit: Publica evento "DocumentoDisponible" (id_documento, id_afiliado)

    %% 4. Consumo Asíncrono de Eventos
    par Despacho en Farmacia
        Rabbit->>MSFarm: Evento "DocumentoDisponible"
        MSFarm->>MSFarm: Valida stock de medicamentos requeridos
    and Notificación al Paciente
        Rabbit->>MSNotif: Evento "DocumentoDisponible"
        MSNotif->>Medico: Envía Email/Push con enlace seguro a la receta
    end

    %% 5. Dispensación en Farmacia
    actor Farmaceutico as Personal Farmacia
    Farmaceutico->>Gateway: POST /api/farmacia/despachar (id_documento_receta)
    Gateway->>MSFarm: Procesar entrega
    MSFarm->>MSFarm: INSERT DESPACHO, UPDATE MEDICAMENTO (stock_disponible - cantidad)
    MSFarm->>Rabbit: Publica evento "DespachoConfirmado" (id_despacho)
    Rabbit->>MSNotif: Evento "DespachoConfirmado"
    MSNotif->>Medico: Notifica retiro exitoso de fármacos