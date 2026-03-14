from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Musica

User = get_user_model()

class MusicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musica
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'is_staff', 'is_suspended', 'must_change_password', 'date_joined']
        read_only_fields = ['id', 'date_joined']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', 'admin123') # Senha padrão conforme plano
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user
