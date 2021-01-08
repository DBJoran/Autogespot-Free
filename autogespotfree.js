"use strict";

async function main(){
  if (document.getElementById('spotdetails')){
    let nodes = await init()
    let obj = await getImageUrls(nodes)
    let urls = obj[0]
    let ul = obj[1]
    addImages(urls, ul)
  }
}

main()

function init() {
  return new Promise((resolve) => {
    let interval = setInterval(function(){
      if (document.getElementsByClassName('login-wall').length > 0){
        let paywall = document.getElementsByClassName('login-wall')[0]
        paywall.parentNode.removeChild(paywall)
      
        clearInterval(interval)
        resolve(Array.from(document.getElementsByClassName('list-reset m0 center')))
      }
    }, 500)
  })
}

function getImageUrls(nodes) {

  return new Promise((resolve) => {
    let interval = setInterval(function(){
      let ul = nodes.filter(node => node.className === 'list-reset m0 center')[0]
      let url = ul.children[0].children[1].src
    
      if (url !== ""){
        let urls = []
        let split = url.split('_')
        let startNumber = parseInt(split[1][0])

        split[1] = split[1].slice(1,split[1].length)

        for (let i = 0; i < 9; i++){
          startNumber = startNumber + 1
          let url = split[0] + "_" + startNumber + split[1]
          if (checkUrl(url)){
            urls.push(url)
          }
        }
        clearInterval(interval)
        resolve([urls, ul])
      }
    }, 500)
  })
}

function addImages(urls, ul){
  for (let i = 0; i < urls.length; i++){
    let li = document.createElement('li')
    li.className = "mb1 md-mb2 lg-mb3 relative placeholder"
  
    let img = document.createElement('img')
    img.src = urls[i]
    img.className = 'fade-in photo lazyloaded'
  
    li.appendChild(img)
    ul.appendChild(li)
  }
}

function checkUrl(url){     
  let http = new XMLHttpRequest(); 

  http.open('HEAD', url, false); 
  http.send(); 

  return http.status != 403; 
}


