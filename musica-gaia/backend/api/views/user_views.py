from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from ..serializers import UserSerializer

from .utils import StatusToggleMixin

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet, StatusToggleMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    @action(detail=True, methods=['post'])
    def toggle_suspension(self, request, pk=None):
        user = self.get_object()
        if user.is_staff:
            return Response({'error': 'Não é possível suspender um administrador.'}, status=status.HTTP_400_BAD_REQUEST)
        
        return self.perform_toggle(
            user, 
            'is_suspended', 
            'Conta suspensa com sucesso.', 
            'Conta reativada com sucesso.'
        )

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def change_password(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not user.check_password(old_password):
            return Response({'error': 'Senha atual incorreta.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.must_change_password = False
        user.save()
        return Response({'status': 'Senha alterada com sucesso.'})
