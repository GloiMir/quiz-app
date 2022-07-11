let content1 = document.getElementById("home")
let content2 = document.getElementById("game")
let content3 = document.getElementById("result")
let nomJoueur = "";
let mailJoueur = "";
let point = 0;


const acceuil =()=>{
    content1.style.display = 'flex';
    content2.style.display = 'none';
    content3.style.display = 'none';
    const inputs = document.getElementsByTagName("input");
    let erreurNom = document.getElementById('erreurNom');
    let erreurMail = document.getElementById('erreurMail');
    document.getElementById('commencer').addEventListener('click',()=>{
        if(inputs[0].value.trim().length===0){
            erreurNom.textContent = "Le nom ne doit pas etre vide";
            inputs[0].style.border = '1px solid red'
        }else{
            if(inputs[0].value.trim().length<4) 
            erreurNom.textContent = "Le nom doit avoir au moins 4 caracteres";
            inputs[0].style.border = '1px solid red'
        }

        if(inputs[1].value.trim().length===0){
            erreurMail.textContent = "Le mail ne doit pas etre vide"
            inputs[1].style.border = '1px solid red'
        }else {
            if(!(/^([a-z0-9]{1,})@([a-z0-9]{1,})\.([a-z0-9]{2,5})$/.test(inputs[1].value.trim())))
            erreurMail.textContent = "Le mail est invalide"
            inputs[1].style.border = '1px solid red'
        }
        
        if(inputs[0].value.trim().length!=0 && inputs[0].value.trim().length >= 4 && inputs[1].value.trim().length!=0 && /^([a-z0-9]{1,})@([a-z0-9]{1,})\.([a-z0-9]{2,5})$/.test(inputs[1].value.trim())){
            inputs[0].style.border = '1px solid gray'
            inputs[1].style.border = '1px solid gray'
            nomJoueur = inputs[0].value;
            mailJoueur = inputs[1].value;
            inputs[0].value = "";
            inputs[1].value = "";
            jeu();
        }
    })
}

const jeu = ()=>{        
    let assertions = document.getElementsByName("assertion");
    let question = document.getElementById('question')
    let ass1 = document.getElementById("ass1")
    let ass2 = document.getElementById("ass2")
    let ass3 = document.getElementById("ass3")
    let ass4 = document.getElementById("ass4")
    let lab1 = document.getElementById("lab1")
    let lab2 = document.getElementById("lab2")
    let lab3 = document.getElementById("lab3")
    let lab4 = document.getElementById("lab4")
    let num = document.getElementById('num')
    let time = document.getElementById('time')
    let barre = document.getElementById('barre');     
    let largeur = 100;
    let i = 0;
    let t = 60;

    const questions = [
        {question:"Qui est le fondateur de javascript",assertion:["Steeve JOBS","Bill GATES","Michael DELL","Brendan EICH"]},
        {question:"La quelle de ces méthodes ne permet pas d'acceder à un élément HTML en javascript",assertion:["getElementById","getElementsByTagName","getElementsByLength","%(id)"]},
        {question:"Quelle erreur a-t-on lorsque on fait des operations numeriques sur ce qui n'est pas un nombre",assertion:["Nember error","NaN","Mistacken number","Wrong number"]},
        {question:"Quelle proprieté permet de modifier le CSS d'un element",assertion:["style","width","heigth","color"]},
        {question:"Quelle méthode permet de supprimer le dernier element d'un tableau",assertion:["sort","push","concat","pop"]},
        {question:"Quelle méthode permet de remplacer un element ou groupe d'element d'un tableau",assertion:["splice","push","concat","pop"]},
        {question:"Quelle méthode permet trier un tableau",assertion:["splice","push","concat","sort"]},

        {question:"Quelle méthode permet de mettre ensemble 2 tableaux",assertion:["sort","push","concat","pop"]},
        {question:"Quelle méthode permet de transformer un sting en tableau",assertion:["sort","split","concat","pop"]},
        {question:"Quelle proprieté permet de trouver le nombre de caracteres d'un string",assertion:["length","push","concat","pop"]},
        {question:"Quelle méthode permet d'inverser les elements d'un tableaux",assertion:["splice","push","reverse","sort"]},

        {question:"Quelle méthode permet de tansformer un tableau en un string",assertion:["sort","push","join","pop"]},
        {question:"Quelle methode permet d'appeller une fonction à chaque intervalle de temps",assertion:["sort","split","concat","setInterval"]},
        {question:"Quelle permet d'appeller une fonction après un temps donné",assertion:["setTimeout","split","concat","setInterval"]},
        {question:"Quelle est la valeur de retour de indexOf lorsque l'element concerné est absent dans le tableaux",assertion:["0","1","-1","-10"]}
    ]
    const reponses = ["Brendan EICH","getElementsByLength","NaN","style","pop","splice","sort","concat","split","length","reverse","join","setInterval","setTimeout","-1"]
    

    let suivant = document.getElementById('suivant')
    let quitter = document.getElementById('quitter')

    
    content1.style.display = 'none';
    content2.style.display = 'flex';
    content3.style.display = 'none';

    
    let stop = false;

    const progres = ()=>{
        if(!stop){
            
            if(t<0){    
                if(i<15){
                    for(j=0;j<assertions.length;j++){
                        if(assertions[j].checked){ 
                            if(assertions[j].value==reponses[i]){
                                point++ 
                                assertions[j].checked = false
                            }else assertions[j].checked = false                              
                        }                  
                    }                
                    i++;
                    t=60;
                    largeur=100;
                }else {
                    for(j=0;j<assertions.length;j++){
                        if(assertions[j].checked){ 
                            if(assertions[j].value==reponses[i]){
                                point++ 
                                assertions[j].checked = false
                            }assertions[j].checked = false                               
                        } else continue                
                    }
                    stop = true
                    resultat();    
                }                
            } else{
                let w = largeur.toString()+'%';
                barre.style.width = w;
                
                num.textContent = i+1+"/15";
                time.textContent = t;
        
                question.textContent=questions[i].question;
                
                lab1.textContent = questions[i].assertion[0];
                lab2.textContent = questions[i].assertion[1];
                lab3.textContent = questions[i].assertion[2];
                lab4.textContent = questions[i].assertion[3];
                
                ass1.value = questions[i].assertion[0];                    
                ass2.value = questions[i].assertion[1];
                ass3.value = questions[i].assertion[2];
                ass4.value = questions[i].assertion[3];
        
                largeur -= 1.666666667;
                t -= 1;
            }
        }else return
    } 
    setInterval(progres,1000);

    suivant.addEventListener("click",()=>{   
        if(i<15) {
            let repondu = false;
            for(j=0;j<assertions.length;j++){
                if(assertions[j].checked){ 
                    if(assertions[j].value==reponses[i]){
                        point++
                        assertions[j].checked = false;
                        repondu = true
                    } else{
                        assertions[j].checked = false
                        repondu = true;
                    }                    
                }               
            }  
            if(repondu){
                i++;
                t = 60;
                largeur=100;
            }
            
        }else{
            for(j=0;j<assertions.length;j++){
                if(assertions[j].checked){ 
                    if(assertions[j].value==reponses[i]){
                        point++ 
                        assertions[j].checked = false;
                    }                               
                } else assertions[j].checked = false
            }
            i=0;
            t=60;
            stop = true
            largeur=100;
            resultat();
        }                                          
    })
    quitter.addEventListener('click',()=>{
        i=0;
        t=60;
        stop = true
        largeur=100;
        resultat();
    })
}

const resultat =()=>{
    content1.style.display='none'
    content2.style.display='none'
    content3.style.display='flex'
    document.getElementById('nom_joueur').textContent = nomJoueur;
    document.getElementById('mail_joueur').textContent = mailJoueur;
    if(point<8)document.getElementById('im1').style.display ='none'
    else document.getElementById('im2').style.display ='none'
    document.getElementById('point').textContent = point+"/15";
    document.getElementById('retour').addEventListener('click',()=>{
        point = 0;
        acceuil();
    } );
}

acceuil()