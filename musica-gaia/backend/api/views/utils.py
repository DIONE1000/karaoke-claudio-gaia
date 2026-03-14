from rest_framework.response import Response
from rest_framework import status

class StatusToggleMixin:
    """
    Mixin para fornecer uma ação de toggle de status genérica.
    """
    def perform_toggle(self, obj, field_name, success_msg_active, success_msg_inactive):
        current_status = getattr(obj, field_name)
        setattr(obj, field_name, not current_status)
        obj.save()
        
        status_msg = success_msg_active if getattr(obj, field_name) else success_msg_inactive
        return Response({'status': status_msg})
