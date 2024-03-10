from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Produto
from django.contrib.auth.models import User

class ProdutoTestCase(APITestCase):
    def setUp(self) -> None:
        usr,pwd = "usuario_teste","senha_teste"
        self.user = User.objects.create_user(username=usr, password=pwd)
        
        response = self.client.post(reverse('Obter-Tokens'), {'username': usr, 'password': pwd}, format='json')
        self.token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        
        self.product = Produto.objects.create(nome="Camiseta Insider", descricao="Camiseta tecnológica", valor=149.99)
        
        self.list_and_create_url = reverse('Produto-List-And-Create')
        self.product_url = reverse('Produto-Details',kwargs={'pk':self.product.pk})
        self.wrong_product_url = reverse('Produto-Details',kwargs={'pk':25})
        
    def test_create_product(self) -> None:
        "Esse teste cria um produto novo e verifica o status code da resposta http."
        payload = {"nome":"iPhone 15","descricao":"Smartphone da Apple 15ª geração","valor":15000.00}
        response = self.client.post(self.list_and_create_url,payload,format="json")
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)
        self.assertEqual(Produto.objects.count(),2)
    def test_get_product_list(self) -> None:
        "Esse teste obtem a lista de produtos cadastrados, como no setup só foi adicionado um produto, este deve ser o tamanho da list."
        response = self.client.get(self.list_and_create_url)
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        self.assertEqual(len(response.data),1)
    def test_retrieve_some_product(self):
        "Esse teste deve obter as informações de um determinado produto e validar todos os parametros dele."
        response = self.client.get(self.product_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nome'], 'Camiseta Insider')
        self.assertEqual(response.data['descricao'], 'Camiseta tecnológica')
        self.assertEqual(response.data['valor'], '149.99')
    def test_update_product_data(self) -> None:
        "Este teste modifica todos os dados de um produto (nome, descricao e valor) e valida se os dados foram modificados."
        new_data = {"nome":"Calça Jeans","descricao":"Calça para usar no dia a dia.","valor":200.00}
        response = self.client.put(self.product_url,new_data,format="json")
        self.assertEqual(response.status_code,status.HTTP_200_OK)
        mod_product = Produto.objects.get(pk=self.product.pk)
        self.assertEqual(mod_product.nome,"Calça Jeans")
        self.assertEqual(mod_product.descricao,"Calça para usar no dia a dia.")
        self.assertEqual(mod_product.valor,200.00)
    def test_delete_product(self) -> None:
        "Esse teste é para deletar o registro do produto criado no setUp."
        response = self.client.delete(self.product_url)
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)
        self.assertEqual(Produto.objects.count(),0)
    def test_create_product_with_wrong_precision(self) -> None:
        "Esse teste é para validar se o model está garantindo a regra de apenas duas casas decimais para o valor."
        new_product = {"nome":"Gasolina litro","descricao":"Litro de gasolina (combustível).","valor":5.959}
        response = self.client.post(self.list_and_create_url,data=new_product,format="json")
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    def test_add_duplicate_products(self) -> None:
        "Esse teste tem o intuito de tentar adicionar um produto duplicado e validar o requisito de unique no campo 'nome'."
        duplicated_product = {"nome":"Camiseta Insider", "descricao":"Dummy value", "valor":0}
        response = self.client.post(self.list_and_create_url,data=duplicated_product,format="json")
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)
    def test_remove_unavailable_product(self) -> None:
        "Esse teste serve para tentar remover um produto inexistente."
        response = self.client.delete(self.wrong_product_url)
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
    def test_stress_add_new_product(self) -> None:
        "Esse teste serve para adicionar em loop N produtos e validar se o servidor armazenou corretamente a quantidade de produtos."
        N = 10000
        for i in range(N):
            new_product = {"nome":f"Produto {i+1}","descricao":"Not available","valor":i+1}
            self.client.post(self.list_and_create_url,data=new_product,format="json")
        self.assertEqual(Produto.objects.count(),N+1)