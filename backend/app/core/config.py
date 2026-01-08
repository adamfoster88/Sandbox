from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # App
    APP_NAME: str = "DataFlow API"
    DEBUG: bool = False
    API_VERSION: str = "v1"

    # CORS - Frontend URL
    FRONTEND_URL: str = "http://localhost:5173"

    # Azure AD Authentication
    AZURE_TENANT_ID: Optional[str] = None
    AZURE_CLIENT_ID: Optional[str] = None
    AZURE_CLIENT_SECRET: Optional[str] = None

    # Azure Blob Storage
    AZURE_STORAGE_ACCOUNT_NAME: Optional[str] = None
    AZURE_STORAGE_ACCOUNT_KEY: Optional[str] = None
    AZURE_STORAGE_CONNECTION_STRING: Optional[str] = None

    # SQL Server
    SQL_SERVER_HOST: Optional[str] = None
    SQL_SERVER_DATABASE: Optional[str] = None
    SQL_SERVER_USER: Optional[str] = None
    SQL_SERVER_PASSWORD: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
