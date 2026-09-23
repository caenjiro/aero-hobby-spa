erDiagram
    %% ========================================================
    %% ESQUEMA: db_auth (Microservicio Autenticación y Roles)
    %% ========================================================
    USUARIO {
        char(36) id_usuario PK "UUID v4"
        varchar(150) email UK
        varchar(255) password_hash
        boolean esta_activo
        datetime fecha_creacion
        datetime ultimo_acceso
    }
    ROL {
        int id_rol PK "AUTO_INCREMENT"
        varchar(50) nombre_rol UK "Afiliado, Medico, Farmaceutico, Admin"
        varchar(255) descripcion
    }
    USUARIO_ROL {
        char(36) id_usuario PK,FK
        int id_rol PK,FK
        datetime fecha_asignacion
    }
    USUARIO ||--o{ USUARIO_ROL : tiene
    ROL ||--o{ USUARIO_ROL : asignado_a

    %% ========================================================
    %% ESQUEMA: db_registro (Microservicio Registro)
    %% ========================================================
    AFILIADO {
        char(36) id_afiliado PK "UUID v4"
        char(36) id_usuario_auth UK "Lógica -> db_auth.USUARIO"
        varchar(20) tipo_identificacion "CC, TI, CE, Pasaporte"
        varchar(30) numero_identificacion UK
        varchar(80) primer_nombre
        varchar(80) segundo_nombre
        varchar(80) primer_apellido
        varchar(80) segundo_apellido
        date fecha_nacimiento
        varchar(15) genero
        varchar(20) telefono_contacto
        varchar(200) direccion_residencia
        varchar(20) estado_afiliacion "ACTIVO, INACTIVO, SUSPENDIDO"
        datetime fecha_registro
    }

    %% ========================================================
    %% ESQUEMA: db_citas (Microservicio Gestión de Citas)
    %% ========================================================
    MEDICO {
        char(36) id_medico PK "UUID v4"
        char(36) id_usuario_auth UK "Lógica -> db_auth.USUARIO"
        varchar(50) registro_profesional UK
        varchar(100) especialidad
        varchar(100) nombre_completo
        boolean esta_activo
    }
    DISPONIBILIDAD_HORARIA {
        char(36) id_disponibilidad PK "UUID v4"
        char(36) id_medico FK
        date fecha
        time hora_inicio
        time hora_fin
        varchar(20) estado "DISPONIBLE, RESERVADO, BLOQUEADO"
    }
    CITA {
        char(36) id_cita PK "UUID v4"
        char(36) id_afiliado "Lógica -> db_registro.AFILIADO"
        char(36) id_medico FK
        char(36) id_disponibilidad FK
        datetime fecha_hora_inicio
        datetime fecha_hora_fin
        varchar(20) estado "PROGRAMADA, COMPLETADA, CANCELADA, REPROGRAMADA"
        varchar(255) motivo_consulta
        datetime fecha_creacion
    }
    MEDICO ||--o{ DISPONIBILIDAD_HORARIA : oferta
    MEDICO ||--o{ CITA : atiende
    DISPONIBILIDAD_HORARIA ||--o| CITA : asignada_a

    %% ========================================================
    %% ESQUEMA: db_documentos (Microservicio Documentos)
    %% ========================================================
    DOCUMENTO {
        char(36) id_documento PK "UUID v4"
        char(36) id_afiliado "Lógica -> db_registro.AFILIADO"
        char(36) id_medico "Lógica -> db_citas.MEDICO"
        char(36) id_cita "Lógica -> db_citas.CITA"
        varchar(50) tipo_documento "HISTORIA_CLINICA, RECETA_MEDICA, INCAPACIDAD, ORDEN"
        varchar(255) nombre_archivo
        varchar(500) url_blob_storage "Enlace a Azure Blob Storage"
        varchar(64) hash_sha256 "Integridad documental"
        bigint tamano_bytes
        varchar(50) mime_type "application/pdf, image/png, etc."
        datetime fecha_emision
    }

    %% ========================================================
    %% ESQUEMA: db_farmacia (Microservicio Farmacia)
    %% ========================================================
    MEDICAMENTO {
        char(36) id_medicamento PK "UUID v4"
        varchar(50) codigo_institucional UK
        varchar(150) nombre_generico
        varchar(150) nombre_comercial
        varchar(100) concentracion
        varchar(50) forma_farmaceutica
        int stock_disponible
        int stock_minimo
    }
    DESPACHO {
        char(36) id_despacho PK "UUID v4"
        char(36) id_afiliado "Lógica -> db_registro.AFILIADO"
        char(36) id_documento_receta UK "Lógica -> db_documentos.DOCUMENTO"
        char(36) id_farmaceutico_auth "Lógica -> db_auth.USUARIO"
        datetime fecha_despacho
        varchar(20) estado "PENDIENTE, ENTREGADO, CANCELADO"
        varchar(255) observaciones
    }
    DETALLE_DESPACHO {
        char(36) id_detalle PK "UUID v4"
        char(36) id_despacho FK
        char(36) id_medicamento FK
        int cantidad_solicitada
        int cantidad_entregada
        varchar(255) posologia
    }
    DESPACHO ||--o{ DETALLE_DESPACHO : incluye
    MEDICAMENTO ||--o{ DETALLE_DESPACHO : dispensado_en

    %% ========================================================
    %% RELACIONES LÓGICAS CROSS-DOMAIN (Sin FK física en DB)
    %% ========================================================
    USUARIO ||..o{ AFILIADO : "1:1 Lógico (id_usuario_auth)"
    USUARIO ||..o{ MEDICO : "1:1 Lógico (id_usuario_auth)"
    USUARIO ||..o{ DESPACHO : "1:N Lógico (id_farmaceutico_auth)"
    AFILIADO ||..o{ CITA : "1:N Lógico (id_afiliado)"
    AFILIADO ||..o{ DOCUMENTO : "1:N Lógico (id_afiliado)"
    AFILIADO ||..o{ DESPACHO : "1:N Lógico (id_afiliado)"
    CITA ||..o{ DOCUMENTO : "1:N Lógico (id_cita)"
    DOCUMENTO ||..o{ DESPACHO : "1:1 Lógico (id_documento_receta)"
