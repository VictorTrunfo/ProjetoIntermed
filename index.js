const express = require('express')
const axios = require('axios').default
const parser = require('node-html-parser').parse
const app = express()
const PORT = process.env.PORT || 8080


app.get('/', function(req, res) {

    
    var url = "https://worldofwarcraft.com/pt-br/game/classes"


    var requisicao = axios.get(url)
    requisicao.then(function(resposta) {
        
        var root = parser(resposta.data)
        var divClasses = root.querySelectorAll('.Card-content')
        
        var c = {}
        var classes = []

        for (let i = 0; i < divClasses.length; i++) {
            var gutter = divClasses[i].querySelector('.gutter-normal')

            let c1 = gutter.childNodes[0]['rawText']
            let c2 = gutter.childNodes[1]['rawText']
            let c3 = gutter.childNodes[2]['rawText']

            var c = {
                "classe": c1,
                "função": c2,
                "descrição": c3
            }

            classes.push(c)

            // console.log("Classe: " + c1)
            // console.log("Tipo: " + c2)
            // console.log("Descrição: " + c3)
        }

        res.json(classes)
    })
})



app.listen(PORT, function() {
    console.log("Servidor iniciado")
})