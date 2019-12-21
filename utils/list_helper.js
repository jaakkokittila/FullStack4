const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    let likes = blogs.map(blog => blog.likes)
    let reducer = (acc, current) => acc + current
    return likes.reduce(reducer)

}

const mostLiked = (blogs) => {
    var max = 0
    var maxLikes = blogs[0].likes
    for (let i = 0; i < blogs.length; i++){
        if (blogs[i].likes > maxLikes){
            maxLikes = blogs[i]
            max = i
        }
    }
    return blogs[max]
}
  
  module.exports = {
    dummy,
    totalLikes,
    mostLiked
  }