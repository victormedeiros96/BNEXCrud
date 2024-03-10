from django.db import models

class Produto(models.Model):
    nome = models.CharField(max_length=255,unique=True)
    descricao = models.TextField() # No char limit
    valor = models.DecimalField(max_digits=15, decimal_places=2) # Like fixed point variable: (13).(2)
    def __str__(self) -> str:
        return f'''Produto: {self.nome} - R$ {self.valor:.2f}
{self.descricao}
'''