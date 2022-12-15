// app.js

const users = [
    {
      id: 1,
      name: "Rebekah Johnson",
      email: "Glover12345@gmail.com",
      password: "123qwe",
    },
    {
      id: 2,
      name: "Fabian Predovic",
      email: "Connell29@gmail.com",
      password: "password",
    },
  ];
  
  const posts = [
    {
      id: 1,
      title: "간단한 HTTP API 개발 시작!",
      content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
      userId: 1,
    },
    {
      id: 2,
      title: "HTTP의 특성",
      content: "Request/Response와 Stateless!!",
      userId: 2,
    },
  ];


  function postingReturn(post){
    return {
        userId:post.userId,
        userName:users[post.userId-1].name,
        postingId:post.id,
        postingTitle:post.title,
        postingContent:post.content,
    }
  }
  
  const http=require("http");
  const server=http.createServer();

  const httpRequestListener= function(request, response){
    const {url,method}=request;
    if(method=="GET"){
        if(url==="/get"){
            let body=[];
            request.on("data",()=>{    
            });
            request.on("end",()=>{
                for(let i in posts){
                    body.push(postingReturn(posts[i]))
                }
                response.writeHead(200,{"Content-Type": "application/json"});
                response.end(JSON.stringify({data:body}));
            })
        }
        else{
            response.writeHead(200,{"Content-Type": "application/json"});
            response.end("Hello World!");
        }       
    }
    if(method=="POST"){
        if(url==="/users"){
        let body="";
        request.on("data",(chunk)=>{
            body+=chunk;});
        request.on("end",()=>{
            const user= JSON.parse(body);
            users.push({
                id:user.id,
                name:user.name,
                email:user.email,
                password:user.password,
            });
            response.writeHead(200,{"Content-Type": "application/json"});
            response.end(JSON.stringify({message:"userCreated"}))})
        }
        if(url==="/posts"){
            let body="";
            request.on("data",(chunk)=>{
                body+=chunk;});
            request.on("end",()=>{
                const post= JSON.parse(body);
                posts.push({
                    id:post.id,
                    title:post.title,
                    content:post.content,
                    userId:post.userId,
            })
            response.writeHead(200,{"Content-Type": "application/json"});
            response.end(JSON.stringify({message:"postCreated"}));
        }
            )
        }

    }
    if(method=="PATCH"){
        if(url==="/modify"){
            let body="";
            request.on("data",(chunk)=>{
                body+=chunk;});
            request.on("end",()=>{
                const postingId= JSON.parse(body).id;
                posts[postingId-1].content=content.content;
                response.writeHead(200,{"Content-Type": "application/json"});
                response.end(JSON.stringify({data:postingReturn(posts[postingId-1])}));
            }
            );        
        }
        } 
    if(method=="DELETE"){ 
        if(url==="/delete"){
            let body="";
            let postingId;
            request.on("data",(chunk)=>{
                body+=chunk;});
            request.on("end",()=>{
                const deleteId=JSON.parse(body).id;
                posts.splice(deleteId-1,1);
                for(let i=deleteId-1; i<posts.length; i++) {
                    posts[i].id=i+1;
                }         
                console.log(posts);
                response.writeHead(200,{"Content-Type": "application/json"});
                response.end(JSON.stringify({message:"postingDeleted"}));
            })

    }
    }
  }
  const IP="127.0.0.1";
  const PORT=8000;
  server.on("request", httpRequestListener);
  server.listen(PORT, IP, () => {
    console.log(`Server is running at http://${IP}:${PORT}`);
  });
