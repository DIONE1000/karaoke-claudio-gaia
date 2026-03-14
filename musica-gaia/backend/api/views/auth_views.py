from rest_framework import exceptions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Adiciona claims customizados ao token
        token['is_staff'] = user.is_staff
        token['must_change_password'] = user.must_change_password
        return token

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        
        # Tenta encontrar o usuário pelo email antes de autenticar para dar erro específico
        user_obj = User.objects.filter(email=email).first()
        
        if not user_obj:
            raise exceptions.AuthenticationFailed("Esta conta não existe ou foi excluída pelo administrador.")
            
        if user_obj.is_suspended:
            raise exceptions.AuthenticationFailed("Sua conta foi suspensa pelo administrador. Entre em contato para mais informações.")

        # Autenticação padrão
        try:
            data = super().validate(attrs)
        except Exception:
            raise exceptions.AuthenticationFailed("Email ou senha incorretos. Verifique seus dados.")
        
        # Se chegou aqui, logou com sucesso
        data['must_change_password'] = self.user.must_change_password
        data['is_staff'] = self.user.is_staff
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
