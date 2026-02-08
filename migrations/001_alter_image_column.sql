-- Migração: alterar coluna image para suportar imagens em base64
-- Execute este script no banco de dados existente para corrigir a perda de imagem ao atualizar a página
-- mysql -u usuario -p rpsdb_dev < migrations/001_alter_image_column.sql

USE rpsdb_dev;

ALTER TABLE rpsdb_dev.players 
MODIFY COLUMN image MEDIUMTEXT NULL;
