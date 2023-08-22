# Getting Started with Create React App

Para Iniciar el Proyecto
npm start

<h1> General</h1>
Este proyecto está diseñado para el área de cobranzas de la Universidad Tecnológica Nacional - FRT.
Fue creado en base a los requerimientos pedidos por esta área, con el fin de procesar los pagos que los alumnos de diversas carreras realizan mensualmente. De esta forma, se centralizará toda la información financiera referida a los pagos de cuotas.
El programa está planteado en base a una API desarrollada en .NET que luego será consumida desde una aplicación web (en este caso una aplicación react) y/o mobile.

Tecnologias utilizadas:
Back-end (API): ASP .NET, JWT, Swagger, EntityFramework, SpreadsheetLight (manejo de Excel) y EFCore.BulkExtensions (manejo de datos masivo).
Frontend: React TS,Redux,Axios(Conexion con la Api), Material UI y Bootstrap para el Diseño del front..
Base de datos: MSSQL.



<h1>Dinamica de Uso</h1>


Dinámica De Uso

El programa de cobranzas es una herramienta diseñada para facilitar la gestión y control de los procesos de cobro de la facultad. Su objetivo principal es agilizar y automatizar las tareas relacionadas con la recuperación de pagos pendientes y el seguimiento de la cuenta de los alumnos.
La aplicación cuenta con un login básico en el cual, tanto los alumnos como los directores y las personas relacionadas con el área de cobranzas, ingresarán sus datos para poder autenticarse. Luego de la autorización se genera un token en el cual se encuentra la información del usuario y su rol. A partir de este rol, el usuario tendrá acceso a determinadas rutas (por ejemplo: los alumnos no pueden tener acceso a la creación de las cuotas, de los pagos, de otros alumnos, entre otras; sin embargo, el usuario administrador si las tiene).
Luego de iniciar sesión, nos redirigirá a una pantalla home donde tendremos una barra de navegación en la parte superior de la pantalla donde se encontrarán los botones que nos redirigirá a las páginas correspondientes a cada endpoint(detallado en la sección siguiente).
Suponiendo que somos usuarios administradores, podremos crear, eliminar, modificar y obtener las siguientes entidades: las carreras de la facultad que manejan cuotas pagas; el precio de las cuotas; todas las personas que manejan el sistema, tanto alumnos como los empleados que tienen acceso al sistema; la información de los usuarios y sus respectivos roles; y por último la información de los pagos.
Con respecto a los pagos, a pedido del área de cobranzas, estos mismos pueden ser realizados de manera masiva a través de un archivo Excel de referencia, el cual el sistema mapeará los datos a la base de datos. Esta implementación también fue diseñada para los alumnos, los cuales tienen una inserción masiva a través de Excel. A su vez, ambas entidades, pueden realizar una eliminación masiva de registros especificando la fecha y hora desde/hasta la que se quiere eliminar.
Toda esta información, se muestran en tablas dentro de cada página de una manera muy intuitiva para que el usuario navegue por la aplicación sin ninguna complicación. En el caso en el que desee agregar, editar o modificar registros en alguna de las entidades, se muestran los botones que nos abren modales (también llamados ventanas emergentes) con todas las características de la entidad.
