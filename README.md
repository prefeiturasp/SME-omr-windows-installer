# Windows Installer 2.2.0

## Dependências ##
* Node https://nodejs.org/en/download/
* Inno Setup 5.5.8 http://files.jrsoftware.org/is/5/
* Node Canvas 1.3.9 Já instalado na pasta ./lib/canvas
* ImageMagick convert.exe 6.9.2-8 Q16 Já instalado na pasta ./lib/ImageMagick
* Executavel NodeJS 4.3.1.0 Já instalado na pasta ./lib
 
## Build do instalador ##
* Executar terminal como administrador

* Instalar dependência global do grunt <br>
```sh
npm install -g grunt
```

* Instalar dependência global do bower <br>
```sh
npm install -g bower
```

* Clonar o instalador do OMR  <br>
 * https://gitlab.com/smecotic/omr-windows-installer

* Instalar dependências do instalador na pasta do projeto **omr-windows-installer** <br>
```sh
npm install
```
 
* Submódulos 
```sh
git submodule init
git submodule update --recursive
git submodule foreach --recursive git pull origin master
```

Obs: Caso ocorra problemas na instalação do submódulo no procedimento acima, o sheel script **cloneSubmodulesHttps.sh** ou **cloneSubmodulesSsh.sh** 
localizados na pasta do projeto **omr-windows-installer** deverá ser executado para realizar o mesmo processo. 

* Executar build com grunt <br>

```sh
grunt
```

## Instalação da aplicação ##

* Execute como administrador o arquivo **mstech-omr.exe** localizado da pasta **output** 
 * Durante o processo de instalação será executado automaticamente a instalação do **VC_Redist_x86** da Microsoft, prossiga até a sua finalização.
  * Caso o mesmo já tenha sido instalado, o instalador perguntará se deseja reparar a instalação, apenas clique no botão "close".
* Ao fim do processo de instalação será executado o assistente de configurações do OMR, caso o mesmo não seja executado basta executa-lo manualmente rodando o arquivo **C:\GestaoAvaliacao-OMR\bin\configuration.bat** como administrador. 

## Configuração da aplicação (OMR Configuration Manager) ##


**Configurações Gerais**

Na página "Configurações" existe um link "Geral". Esta é uma tela de configurações gerais dos serviços. <br>
Obs: Se realizado a configuração geral, os módulos **API**, **Organizador de arquivos**, **Pré processor**, **Processor**, **Sincronizador de resultados** herdarão a configuração geral, não sendo necessário configurá-los  
 
Mapeamento dos Campos (Tela > Arquivo):
* Caminho da pasta de arquivos > **FILE_BASEPATH**
* String de Conexão > **DB_MONGODB** (Este valor está criptografado, é necessário descriptografar para colocar no campo, para isto vá em Dashboard / Utilidades / Criptografia
* Domínio da API > **CONNECTOR_SIA_HOST**
* Usuário da API > **CONNECTOR_SIA_USERNAME**
* Senha da API > **CONNECTOR_SIA_PASSWORD**

**Área administrativa**

Dashboard para acompanhamento do processamento. 

* Verificar se o sistema OMR (sis_id=217) foi criado na tabela **Sys_Sistema** do banco **CoreSSO**, caso não, execute o script abaixo:

```sql
USE [PTRF_CoreSSO]
GO

SET XACT_ABORT ON
BEGIN TRAN

DECLARE
	@ent_id UNIQUEIDENTIFIER
	, @sis_caminho VARCHAR(2000)
	, @sis_caminhoLogout VARCHAR(2000)
	, @sis_id INT
	, @gru_id_administrador UNIQUEIDENTIFIER
	, @usu_id UNIQUEIDENTIFIER

SET @sis_id = 217
SET @ent_id = (SELECT ent_id FROM SYS_Entidade WHERE ent_sigla = 'SMESP')
SET @sis_caminho = 'http://13.65.83.152:3000/auth/signin'
SET @sis_caminhoLogout = 'http://13.65.83.152:3000/auth/signout'

IF (NOT EXISTS(SELECT * FROM SYS_Sistema WHERE sis_id = @sis_id))
BEGIN
	INSERT INTO SYS_Sistema (sis_id, sis_nome, sis_descricao, sis_caminho, sis_tipoAutenticacao, sis_situacao, sis_caminhoLogout)
	VALUES (@sis_id, 'OMR Admin', '', @sis_caminho, 1, 1, @sis_caminhoLogout)
END

IF (NOT EXISTS(SELECT * FROM SYS_SistemaEntidade WHERE sis_id = @sis_id AND ent_id = @ent_id))
BEGIN
	INSERT INTO SYS_SistemaEntidade (sis_id, ent_id, sen_situacao) VALUES (@sis_id, @ent_id, 1)
END

IF (NOT EXISTS(SELECT * FROM SYS_Grupo WHERE sis_id = @sis_id AND gru_nome = 'Administrador'))
BEGIN
	INSERT INTO SYS_Grupo (gru_nome, gru_situacao, vis_id, sis_id, gru_integridade)
	VALUES ('Administrador', 1, 1, @sis_id, 1)
END

SET @gru_id_administrador = (SELECT gru_id FROM SYS_Grupo WHERE sis_id = @sis_id AND gru_nome = 'Administrador')
SET @usu_id = (SELECT usu_id FROM SYS_Usuario WHERE usu_login = 'admin' AND ent_id = @ent_id)

IF (NOT EXISTS(SELECT * FROM SYS_UsuarioGrupo WHERE gru_id = @gru_id_administrador AND usu_id = @usu_id))
BEGIN
	INSERT INTO SYS_UsuarioGrupo (usu_id, gru_id, usg_situacao)
	VALUES (@usu_id, @gru_id_administrador, 1)
END
GO

COMMIT TRAN
```

* Execute o seguinte script para obter o ID do grupo Administrador:

```sql
USE [PTRF_CoreSSO]
GO
DECLARE
    @ent_id UNIQUEIDENTIFIER,
    @sis_id INT
SET @sis_id = 217
SET @ent_id = (SELECT ent_id FROM SYS_Entidade WHERE ent_sigla = 'SMESP')
SELECT gru_id FROM SYS_Grupo WHERE sis_id = @sis_id
```

Mapeamento dos Campos (Tela > Arquivo):
* Domínio do IDP > **SAML_IDP_DOMAIN**
* ID do Grupo de Administrador > **CORESSO_ADMIN_GROUP_ID** (Obtido através do srcipr SQL acima)
 * Executar o script para identifiar o ID do Administrador no banco SQL do CoreSSO:
* MSSQL Server Host > **MSSQL_SERVER**
* Nome da Base de Dados > **MSSQL_CORE_DATABASE**
* Usuário da Base de Dados > **MSSQL_CORE_USERNAME**
* Senha da Base de Dados > **MSSQL_CORE_PASSWORD**

**Agendador de Tarefas**

Serviço que gerencia a execução dos processos de correção de provas

Agendamento:

* Organizador de Arquivos: Tempo de agendamento do Organizador de Arquivos. Padrão CRON;
* Pré Processador: Tempo de agendamento do Pré Processador. Padrão CRON;
* Processador: Tempo de agendamento do Processador. Padrão CRON;
* Sincronizador de Resultados: Tempo de agendamento do Sincronizador de Resultados. Padrão CRON.

## Finalização ##

Ao terminar o processo de instalação e configuração, é necessário ir nos serviços do Windows e iniciar os seguintes serviços:
* OMR_ADMIN
* OMR_API
* OMR_SCHEDULER 

 


