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

function render() {
    let postsDiv = $('.posts');
    postsDiv.empty();
    for (let i = 0; i<posts.length; i++) {
        postsDiv.append("<p class='post' data-id='"+posts[i].id+"'>"+ posts[i].text + "</p>");
    }
}

function onCreatePostClick() {
    createPost();
    render();
}

$('.add-post').click(onCreatePostClick);
