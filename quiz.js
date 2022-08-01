let content1 = document.getElementById("home")//Contenu de la page d'accueil
let content2 = document.getElementById("game")//Contenu du jeu
let content3 = document.getElementById("result")//Contenu du resultat
let nomJoueur = ""
let mailJoueur = ""
let point = 0;

//Fonction s'executant lorsqu'on est à l'accueil
const acceuil =()=>{
    content1.style.display = 'flex';
    content2.style.display = 'none';
    content3.style.display = 'none';
    let nom = document.getElementById('nom');
    let mail = document.getElementById('mail')
    let erreurNom = document.getElementById('erreurNom');
    let erreurMail = document.getElementById('erreurMail');
    document.getElementById('commencer').addEventListener('click',()=>{

        if(nom.value.trim().length==0){//Teste de taille du nom
            erreurNom.textContent = "Le nom ne doit pas etre vide";
            nom.style.border = '1px solid red'
        }else{//Teste de validité du nom
            if(nom.value.trim().length<4){
                erreurNom.textContent = "Le nom doit avoir au moins 4 caracteres";
                nom.style.border = '1px solid red'
            }
        }
        if(mail.value.trim().length==0){//Teste de taille du mail
            erreurMail.textContent = "Le mail ne doit pas etre vide"
            mail.style.border = '1px solid red'
        }else {//Teste de validité du mail
            if(!(/^([a-z0-9]{1,})@([a-z0-9]{1,})\.([a-z0-9]{2,5})$/.test(mail.value.trim()))){
                erreurMail.textContent = "Le mail est invalide"
                mail.style.border = '1px solid red'
            }            
        }
        
        if(nom.value.trim().length!=0 && nom.value.trim().length >= 4 && mail.value.trim().length!=0 && /^([a-z0-9]{1,})@([a-z0-9]{1,})\.([a-z0-9]{2,5})$/.test(mail.value.trim())){
            nom.style.border = '1px solid gray'
            mail.style.border = '1px solid gray'
            nomJoueur = nom.value;
            mailJoueur = mail.value;
            erreurNom.textContent="";
            erreurMail.textContent="";
            jeu();
        }
    })       
}

//Fonction s'executant lorsqu'on est jeu
const jeu = ()=>{        
    let assertions = document.getElementsByName("assertion");//Les assertions
    let question = document.getElementById('question')//La question
    let ass1 = document.getElementById("ass1")
    let ass2 = document.getElementById("ass2")
    let ass3 = document.getElementById("ass3")
    let ass4 = document.getElementById("ass4")
    let lab1 = document.getElementById("lab1")
    let lab2 = document.getElementById("lab2")
    let lab3 = document.getElementById("lab3")
    let lab4 = document.getElementById("lab4")
    let rep1 = document.getElementById("rep1")
    let rep2 = document.getElementById("rep2")
    let rep3 = document.getElementById("rep3")
    let rep4 = document.getElementById("rep4")
    let num = document.getElementById('num')//Numero de la question
    let time = document.getElementById('time')//Temps ecoulé sur la question
    let barre = document.getElementById('barre');//La barre de progression     

    const questions = [//Tableau d'objets contenant 2 clés; une question et ses assertions
        {question:"Qui est le fondateur de javascript",assertion:["Steeve JOBS","Bill GATES","Michael DELL","Brendan EICH"]},
        {question:"La quelle de ces méthodes ne permet pas d'acceder à un élément HTML en javascript",assertion:["getElementById","getElementsByTagName","getElementsByLength","$(id)"]},
        {question:"Quelle erreur a-t-on lorsque on fait des operations numeriques sur ce qui n'est pas un nombre",assertion:["Nember error","NaN","Mistacken number","Wrong number"]},
        {question:"Quelle proprieté permet de modifier le CSS d'un element",assertion:["style","width","heigth","color"]},
        {question:"Quelle méthode permet de supprimer le dernier element d'un tableau",assertion:["sort","push","concat","pop"]},
        {question:"Quelle méthode permet de remplacer un element ou groupe d'element d'un tableau",assertion:["splice","push","concat","pop"]},
        {question:"Quelle méthode permet trier un tableau",assertion:["splice","push","concat","sort"]},
        {question:"Quelle méthode permet de mettre ensemble 2 tableaux",assertion:["sort","push","concat","pop"]},
        {question:"Quelle méthode permet de transformer un string en un tableau",assertion:["sort","split","concat","pop"]},
        {question:"Quelle proprieté permet de trouver le nombre de caracteres d'un string",assertion:["length","push","concat","pop"]},
        {question:"Quelle méthode permet d'inverser les elements d'un tableaux",assertion:["splice","push","reverse","sort"]},
        {question:"Quelle méthode permet de tansformer un tableau en un string",assertion:["sort","push","join","pop"]},
        {question:"Quelle methode permet d'appeller une fonction à chaque intervalle de temps",assertion:["sort","split","concat","setInterval"]},
        {question:"Quelle permet d'appeller une fonction après un temps donné",assertion:["setTimeout","split","concat","setInterval"]},
        {question:"Quelle est la valeur de retour de indexOf lorsque l'element concerné est absent dans le tableaux",assertion:["0","1","-1","-10"]}
    ]
    const reponses = ["Brendan EICH","getElementsByLength","NaN","style","pop","splice","sort","concat","split","length","reverse","join","setInterval","setTimeout","-1"]//Toutes les bonnes réponses
    
    let suivant = document.getElementById('suivant')//Le bouton quitter
    let quitter = document.getElementById('quitter')//Le bouton suivant
    
    content1.style.display = 'none';
    content2.style.display = 'flex';
    content3.style.display = 'none';

    //Les diefferents contenu de la page à l'etat initial
    num.textContent ="Question 1/15";
    time.textContent = 60;

    barre.style.width = '100%'

    question.textContent=questions[0].question;
                
    lab1.textContent = questions[0].assertion[0];
    lab2.textContent = questions[0].assertion[1];
    lab3.textContent = questions[0].assertion[2];
    lab4.textContent = questions[0].assertion[3];
    
    ass1.value = questions[0].assertion[0];                    
    ass2.value = questions[0].assertion[1];
    ass3.value = questions[0].assertion[2];
    ass4.value = questions[0].assertion[3];

    let largeur = 100;
    let i = 0;
    let t = 60;

    let stop = false;
    let repondu = false;

    for(k=0;k<assertions.length;k++){//Changement du bouton au click d'une assertion
        assertions[k].addEventListener('change',()=>{
            suivant.style.backgroundColor='rgba(2, 138, 61, 1)';
            repondu =true                
        })
    }

    //Applications propres à chacune des assertions
    assertions[0].addEventListener('change',()=>{
        rep1.style.border = '2px solid rgba(2, 138, 61, 1)'
        rep2.style.border = '1px solid gray'
        rep3.style.border = '1px solid gray'
        rep4.style.border = '1px solid gray'
    })
    assertions[1].addEventListener('change',()=>{
        rep1.style.border = '1px solid gray'
        rep2.style.border = '2px solid rgba(2, 138, 61, 1)'
        rep3.style.border = '1px solid gray'
        rep4.style.border = '1px solid gray'
    })
    assertions[2].addEventListener('change',()=>{
        rep1.style.border = '1px solid gray'
        rep2.style.border = '1px solid gray'
        rep3.style.border = '2px solid rgba(2, 138, 61, 1)'
        rep4.style.border = '1px solid gray'
    })
    assertions[3].addEventListener('change',()=>{
        rep1.style.border = '1px solid gray'
        rep2.style.border = '1px solid gray'
        rep3.style.border = '1px solid gray'
        rep4.style.border = '2px solid rgba(2, 138, 61, 1)'
    })
    
    //Fonctiion de progression 
    const progres = ()=>{
        if(!stop){            
            if(t<0){    
                if(i<14){
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
                    rep1.style.border = '1px solid gray'
                    rep2.style.border = '1px solid gray'
                    rep3.style.border = '1px solid gray'
                    rep4.style.border = '1px solid gray'
                    suivant.style.backgroundColor='rgba(2, 138, 61, 0.5)'
                }else {
                    for(j=0;j<assertions.length;j++){
                        if(assertions[j].checked){ 
                            if(assertions[j].value==reponses[i]){
                                point++ 
                                assertions[j].checked = false
                            }assertions[j].checked = false                               
                        } else continue                
                    }
                    rep1.style.border = '1px solid gray'
                    rep2.style.border = '1px solid gray'
                    rep3.style.border = '1px solid gray'
                    rep4.style.border = '1px solid gray'
                    suivant.style.backgroundColor='rgba(2, 138, 61, 0.5)'
                    stop = true
                    resultat();    
                }                
            } else{
                let w = largeur.toString()+'%';
                barre.style.width = w;
                
                num.textContent ="Question "+parseInt(i+1)+"/15";
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

    suivant.addEventListener("click",()=>{    //Les operations relatives a boutons suivant       
        if(i<14) {            
            for(j=0;j<assertions.length;j++){
                if(assertions[j].checked){ 
                    if(assertions[j].value==reponses[i]){
                        point++
                        assertions[j].checked = false;                        
                    } else{
                        assertions[j].checked = false
                    }                    
                }               
            }  
            if(repondu){
                i++;
                t = 60;
                largeur=100;
                rep1.style.border = '1px solid gray'
                rep2.style.border = '1px solid gray'
                rep3.style.border = '1px solid gray'
                rep4.style.border = '1px solid gray'
                suivant.style.backgroundColor='rgba(2, 138, 61, 0.5)'
                repondu=false;
            }     
        }else{
            for(j=0;j<assertions.length;j++){
                if(assertions[j].checked){ 
                    if(assertions[j].value==reponses[i]){
                        point++ 
                        assertions[j].checked = false;
                    }else{
                        assertions[j].checked = false                    
                    }                             
                } 
            }
            i=0;
            t=60;
            largeur=100;
            rep1.style.border = '1px solid gray'
            rep2.style.border = '1px solid gray'
            rep3.style.border = '1px solid gray'
            rep4.style.border = '1px solid gray'
            suivant.style.backgroundColor='rgba(2, 138, 61, 0.5)'
            repondu=false
            stop = true;            
            resultat();
        }                                          
    })
    quitter.addEventListener('click',()=>{//Les operations relatives au bouton quitter
        i=0;
        t=60;
        largeur=100;
        for(k=0;k<assertions.length;k++)assertions[k].checked=false
        rep1.style.border = '1px solid gray'
        rep2.style.border = '1px solid gray'
        rep3.style.border = '1px solid gray'
        rep4.style.border = '1px solid gray'
        suivant.style.backgroundColor='rgba(2, 138, 61, 0.5)'
        stop = true
        repondu=false;
        resultat();
    })
}

//Fonction s'executant lorsqu'on quitte ou on finit la partie
const resultat =()=>{
    content1.style.display='none'
    content2.style.display='none'
    content3.style.display='flex'
    document.getElementById('nom_joueur').textContent = nomJoueur;
    document.getElementById('mail_joueur').textContent = mailJoueur;
    if(point<8){
        document.getElementById('im1').style.display ='none'
        document.getElementById('im2').style.display = 'flex'
    }
    else{
        document.getElementById('im2').style.display ='none'
        document.getElementById('im1').style.display ='flex'
    } 
    document.getElementById('point').textContent = point+"/15";
    document.getElementById('retour').addEventListener('click',()=>{
        point = 0;
        nomJoueur="";
        mailJoueur="";
        acceuil();
    } );
}

acceuil()