//задаем стиль кнопки
var button=document.getElementById("button");
button.innerHTML='Новая игра';
button.style.fontFamily='"Times New Roman", serif';
button.style.fontSize="20px"
button.style.padding= '15px';
button.style.border='1px solid #d6e9c6';
button.style.borderRadius='4px';
button.style.color='#3c763d';
button.style.backgroundColor='#dff0d8';

//Задаем стиль костяшкам
var div=document.getElementsByTagName('div');
for(var i=0;i<div.length;i++){
    div[i].style.float='left';
    div[i].style.textAlign='center';
    div[i].style.fontFamily='"Times New Roman", serif';
    div[i].style.fontSize="30px"
    div[i].style.width="40px";
    div[i].style.height='40px';
    div[i].style.padding= '20px';
    div[i].style.border='1px solid #6E6E6E';
    div[i].style.borderRadius='4px';
    div[i].style.color='#000000';
    div[i].style.backgroundColor='#F2F2F2';
    if(i%4==0){
      div[i].style.clear='both';  
    }
}

//перемешка элементов массива которым заполним костяшки
Array.prototype.shuffle = function( b )
{
 var i = this.length, j, t;
 while( i ) 
 {
  j = Math.floor( ( i-- ) * Math.random() );
  t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
  this[i] = this[j];
  this[j] = t;
 }
 return this;
};

//массив чисел для костяшек
var m=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,' '];

//событие нажатие на кнопку "Начало игры"
button.onclick=newgameButtonPress;

//переменная для хранения индекса пустой костяшки
var empty;

//переменная для хранения индекса нажатой костяшки
var click;

//нажатие кнопки новая игра
function newgameButtonPress(){
    //перемешиваем массив чисел
    m.shuffle();
    //проверка на наличие решения
    if(!check()){
        alert('Начните новую игру, в этой нет решения!');
        for(var i=0;i<m.length;i++){
            //очищаем все дивы
            div[i].innerHTML='';
        }
    } 
    else {
        //заполняем дивы числами из перемешанного массива
        for(var i=0;i<m.length;i++){
            div[i].innerHTML=m[i];
            if(m[i]==' '){
                //запоминаем индекс пустой костяшки
                empty=i;
            }
        }
    }
}

//обработка нажатия кнопки
for(var i=0;i<div.length;i++){
    div[i].onclick=moveDiv; 
}

//двигаем костяшки
function moveDiv(){
    //находим и запоминаем индекс нажатого дива
    click=parseInt(this.innerHTML);
    var ind=m.indexOf(click);
    
    //переписать через фор с сравнением каждого элемента с this
    
    //если это пустая костяшка - выходим из функции
    if (ind==-1)return;
    
    //проверка можем ли двигать костяшку
    if((ind==(empty+1)&&((empty+1)%4!=0))||(ind==(empty-1)&&(empty%4!=0))||ind==(empty+4)||ind==(empty-4)){
        //swap 
        var temp=this.innerHTML;
        this.innerHTML=div[empty].innerHTML;
        m[ind]=div[empty].innerHTML;
        div[empty].innerHTML=parseInt(temp);
        m[empty]=parseInt(temp);
        empty=ind;
    }    
}


//проверка на наличие решения
function check(){        
    var inv = 0;
        for (var i = 0; i<16; i++){
            if (m[i]){
                for (var j = 0; j<i; ++j){
                    if (m[j] > m[i]){
                        ++inv;
                    }
                }
            }
        }
        for (var i = 0; i<16; ++i){
            if (m[i] == 0){
                inv += 1 + i / 4;
            }
        }
        if (inv & 1) {
           return true;//решение отсутствует
        }
}