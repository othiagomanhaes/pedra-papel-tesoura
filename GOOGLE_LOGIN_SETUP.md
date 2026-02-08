# Configuração do Login com Google

## 1. Criar projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **API do Google+** ou **Google Identity Services**
4. Vá em **Credenciais** > **Criar credenciais** > **ID do cliente OAuth 2.0**
5. Tipo: **Aplicativo da Web**
6. Adicione em **Origens JavaScript autorizadas**:
   - `http://localhost:3005` (desenvolvimento)
   - Sua URL de produção (ex: `https://seu-dominio.com`)
7. Copie o **ID do cliente** (Client ID)

## 2. Variáveis de ambiente

### Backend (.env na raiz do projeto)
```
GOOGLE_CLIENT_ID=seu_client_id_aqui.apps.googleusercontent.com
```

### Frontend (.env.local na pasta frontend)
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=seu_client_id_aqui.apps.googleusercontent.com
```

Use o **mesmo** Client ID em ambos.

## 3. Instalar dependências

```bash
# Backend
cd backend && npm install google-auth-library

# Frontend
cd frontend && npm install @react-oauth/google
```

## 4. Reiniciar os servidores

Após configurar as variáveis, reinicie o backend e o frontend.
