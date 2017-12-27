// Out post object class with a running id
var nextId = 1;
function Post(text) {
        this.id = nextId++;
        this.text = text;
    };

posts=[];

function createPost() {
    let post = $('#post-name');
    posts.push(new Post(post.val()));
    post.val("");
}

const REMOVE_BUTTON_HTML ="<button class='btn btn-primary remove' type='button'>Remove</button>"
function render() {
    let postsDiv = $('.posts');
    postsDiv.empty();

    for (let i = 0; i<posts.length; i++) {
        let post = $("<p class='post' data-id='"+posts[i].id+"'>"+ posts[i].text +"</p>");
        let removeButton = $(REMOVE_BUTTON_HTML)
        post.append(removeButton);
        postsDiv.append(post);

        removeButton.click(function(){
            posts.splice(i,1);
            render();
        })
    }
}

function onCreatePostClick() {
    createPost();
    render();
}

$('.add-post').click(onCreatePostClick);
