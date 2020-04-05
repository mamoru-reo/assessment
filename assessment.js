'use strict';
const userNameInput=document.getElementById('user-name');
const assessmentBotton=document.getElementById('assessment');
const resultDivided=document.getElementById('result-area');
const tweetDivided=document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する
 * ＠param {HTMLElement} element HTMLの要素
 */
function removeallchildren(element){
    while (element.firstChild){
         element.removeChild(element.firstChild);
        }
}
assessmentBotton.onclick=function(){
    const userName=userNameInput.value;
    if(userName.length===0){
        return;
    }
    
    //TODO 診断結果表示エリアの作成
        removeallchildren(resultDivided);
        const header=document.createElement('h3');
        header.innerText='診断結果';
        resultDivided.appendChild(header);

        const paragraph=document.createElement('p');
        const result=assessment(userName);
        paragraph.innerText=result;
        resultDivided.appendChild(paragraph);
        
        

    //TODO ツイートエリアの作成
        removeallchildren(tweetDivided);
        const anchor=document.createElement('a');
        const hrefValue='http://twitter.com/intent/tweet?button_hashtag='
            +encodeURIComponent('あなたのいいところ')
            +'&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href',hrefValue);
        anchor.className='twitter-hashtag-button';
        anchor.setAttribute('data-text',result);
        anchor.innerText='Tweet #あなたのいいところ';
        tweetDivided.appendChild(anchor);
    //widgets.jsの設定
    const script=document.createElement('script');
    script.setAttribute('src','http://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);


};


const answers=[
    '{userName}まなざし{userName}',
    '{userName}厳しさ{userName}',
    '{userName}情熱{userName}',
    '{userName}のいいところは声{userName}',
    '{userName}知識{userName}',
    '{userName}ユニークさ{userName}',
    '{userName}用心深さ{userName}',
    '{userName}見た目{userName}',
    '{userName}決断力{userName}',
    '{userName}思いやり{userName}',
    '{userName}感受性{userName}',
    '{userName}節度{userName}',
    '{userName}好奇心{userName}',
    '{userName}気配り{userName}',
    '{userName}そのすべて{userName}',
    '{userName}自制心{userName}',
];
/*
    名前の文字列を渡すと診断結果を返す関数
    @param{string} userName ユーザーの名前
    @return{string}診断結果
*/ 
function assessment(userName){
    //文字のコード番号をすべて足し合わせる
    let sumofCharcode=0;
    for (let i = 0; i < userName.length; i++) {
        sumofCharcode=sumofCharcode+userName.charCodeAt(i);
    }
    const index=sumofCharcode%answers.length;
    let result=answers[index];
    result=result.replace(/\{userName\}/g,userName);
    return result;
}
userNameInput.onkeydown=(event)=>{
    if(event.key==='Enter'){
        assessmentBotton.onclick();
    }
};
