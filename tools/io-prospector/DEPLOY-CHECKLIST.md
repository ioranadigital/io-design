# IO-PROSPECTOR: DESPLIEGUE A COOLIFY - CHECKLIST

Fecha Inicio: ****\_\_\_\_****
Ejecutado por: ****\_\_\_\_****

## FASE 1: PRE-REQUISITOS

- [ ] SSH key ~/.ssh/id_ed25519 existe
- [ ] Git repositorio actualizado
- [ ] Acceso a master.env
- [ ] SSH acceso probado a 168.119.53.118
- [ ] rsync instalado
- [ ] docker-compose en servidor

## FASE 2: SINCRONIZAR CÓDIGO

- [ ] .\docs\deployment\sync-to-coolify.ps1 ejecutado
- [ ] backend/, frontend/ sincronizados
- [ ] node_modules, .git, .env EXCLUIDOS
- [ ] Mensaje: "Sincronización completada"

## FASE 3: CONECTAR AL SERVIDOR

- [ ] SSH conexión exitosa
- [ ] En directorio: /apps/io-prospector
- [ ] ls -la muestra estructra correcta

## FASE 4: CREAR .env EN SERVIDOR

- [ ] cp .env.example .env
- [ ] Rellenar variables desde master.env:
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_KEY
  - [ ] SMTP_USER, SMTP_PASS
  - [ ] GOOGLE\_\*\_API_KEY
- [ ] chmod 600 .env

## FASE 5: CONSTRUIR DOCKERFILES

- [ ] docker-compose build --progress=plain (3-10 min)
- [ ] backend imagen creada
- [ ] frontend imagen creada
- [ ] redis imagen descargada
- [ ] Sin errores en build

## FASE 6: INICIAR CONTENEDORES

- [ ] docker-compose up -d
- [ ] docker-compose ps muestra 3 UP
- [ ] docker-compose logs sin errores

## FASE 7: VERIFICAR ACCESO

- [ ] curl http://168.119.53.118:3004 (Frontend 200)
- [ ] curl http://168.119.53.118:4006/api/health (Backend 200)
- [ ] redis-cli -h 168.119.53.118 ping (PONG)

## FASE 8: CONFIGURAR COOLIFY (OPCIONAL)

- [ ] Panel accesible: http://168.119.53.118:8000
- [ ] Proyecto creado: IO-Prospector
- [ ] Application configurada: docker-compose
- [ ] Puertos: 3004, 4006 agregados
- [ ] Variables .env importadas

## DESPLIEGUE COMPLETADO

- [ ] Todas las fases ok
- [ ] Frontend accesible
- [ ] Backend respondiendo
- [ ] Redis funcionando
- [ ] Documentación guardada

## URLS FINALES

Frontend: http://168.119.53.118:3004
Backend: http://168.119.53.118:4006/api
Redis: redis://168.119.53.118:6379
Coolify: http://168.119.53.118:8000

Fecha Completado: ****\_\_\_\_****
Estado: DEPLOYADO ✅
