# System Calling App

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e
 informações de licença aqui--->

<img src="./src/assets/Vídeo.gif" alt="video showing app"/>

> System for better management of a company's services and customers.

### :rocket: Aplication link

Link: <a>http://jgsl-systemcalling.netlify.app</a>

### 🔧 Adjustments and improvements

✔️ The project has been finished.

- [x] Routes with react router dom
- [x] Pages home, login and register
- [x] Components title and header
- [x] Pages dashboard, customers and profile
- [x] Authentication and data storage in firebase
- [x] Route privatization
- [x] Pages allcustomers and new
- [x] Component modal 
- [x] JSX
- [x] Stylization with CSS
- [x] Use the react toastify library
- [x] Responsiveness


### 📁 Pages

<ul>
    <li><strong>Home:</strong> the user chooses between logging in or registering.</li>
    <li><strong>Login:</strong> the user logs in.</li>
    <li><strong>Register:</strong> the user registers.</li>
    <li><strong>Dashboard:</strong> screen that shows all the calls already registered, it is also possible to register a new call by clicking on the 'New call' button.</li>
    <li><strong>Customers:</strong> on this screen the user can register a new customer and see all the items already registered.</li>
    <li><strong>Profile:</strong> in the profile section, the user can log out or edit their data: 'photo', 'number' and 'name'.</li>
    <li><strong>AllCustomers:</strong> the user has the analysis of all registered customers.</li>
    <li><strong>New:</strong> section to register new users.</li>
</ul>

### 🎮 How project works

O projeto consiste num sistema onde o USUÁRIO tem um melhor gerenciamento do seu negócio, podendo cadastrar clientes e chamadas de serviços, como: 
- A empresa/cliente X contratou Y serviço. O serviço está em progresso, foi criado na data ZZ/ZZ/ZZZZ e o assunto é sobre as finanças da empresa X.

A primeira página do projeto é onde o usuário escolherá entre login ou se cadastrar na plataforma. Após a escolha e o efetuamento do login ou cadastro, o usuário será redirecionado para a 'Dashboard', página principal do sistema e receberá um toast de boas-vindas.

Já logado, o usuário tem acesso ao sistema com 3 seções no menu lateral (se estiver no Desktop), caso a largura da tela seja menor que 600px o menu estará na parte superior. Essas seções são dividas entre 'Dashboard' (página principal), 'Clientes' e 'Minha conta'.

Na seção 'Dashboard', o visitante tem acesso a todos os chamados registrados, caso não haja nenhum haverá um botão para cadastrar novos chamados. Os chamados são listados numa tabela ordenada pela data, os últimos a serem cadastrados serão os primeiros a aparecerem na lista.

Na seção 'Clientes', o usuário terá acesso a lista com todos os clientes/empresas e também poderá registrar novos clientes/empresas.

Na seção 'Profile', o usuário terá a possibilidade de alterar seus dados pessoas, cadastrados previamente na página 'Register'.

## ⚠️ Detalhes

O usuário conseguirá acessar a home apenas se estiver logado. Caso não esteja, ele será redirecionado para a Home.

O usuário já logado também não conseguirá voltar para a Home, pois não tem sentido ele logar novamente.

O usuário já logado só pode acessar a Home, caso efetue o log out, no menu Profile, no botão 'Sair' localizado no canto superior direito da tela.


## 👨‍💻 Technologies
Technologies and libs used in the project:
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
    <li>ReactJS</li>
    <li>Firebase</li>
    <li>React-Router-Dom</li>
    <li>Undraw Illustrations</li>
    <li>LocalStorage</li>
    <li>React Hooks</li>
    <li>React-Icons</li>
</ul>

## 🤝 Collaborator

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="./src/assets/gui-foto.jpeg.png" width="100px;" alt="Foto do João Guilherme no GitHub"/><br>
        <sub>
          <b>João Guilherme</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :closed_book: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com) and [Node](https://nodejs.org/en/) installed.

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/jguilhermesl/system-calling
# Access
$ cd system-calling
# Install dependencies
$ yarn or npm 
# Run the project
$ yarn start or npm start 
# The server will initialize in the <http://localhost:3000>
```
