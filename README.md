#Description
Provides Renderer abstract class that convert a .template file to a pdf in form of an arraybuffer

#Renderer
##Ctor
Definition is self-explanatory

##render
Convert the provided template and inject the associated css then return the result as an arraybuffer

##renderAsHTML
Same as `render` but output an HTML.
Use it in dev only and keep in mind that the CSS used inside a PDF is quite restricted. Some styling will work on HTML but not once converted (flexbox is a good exemple) 