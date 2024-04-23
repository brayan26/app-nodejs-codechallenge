#!/bin/bash
echo "Start: Sleep 30 seconds"
sleep 30;

# Creando el topic 'created.transaction'
echo "Creando el topic  =>> 'created.transaction'"
kafka-topics --create --if-not-exists --zookeeper zookeeper:2181 --partitions 1 --replication-factor 1 --topic 'created.transaction'
echo "topic 'created.transaction' creado"

# Creando el topic 'update.transaction'
echo "Creando el topic =>> 'update.transaction'"
kafka-topics --create --if-not-exists --zookeeper zookeeper:2181 --partitions 1 --replication-factor 1 --topic 'update.transaction'
echo "topic 'update.transaction' creado"


# Comando de espera infinita para mantener el contenedor en ejecución
tail -f /dev/null