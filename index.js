$(document).ready(function (){

});

function searchRepositories() {
  let searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
        $('#results').html(
    data.items.map( function(repository) {
      return `      <div>
        <h2><a href="${repository.html_url}">${repository.name}</a></h2>
        <p><a href="#" data-repository="${repository.name}" data-owner="${repository.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${repository.description}</p>
      </div>`
    }).join('')
  )}).fail(function(error) {
    displayError(error)
});
}

function displayError(error) {
    $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits (commits) {
$.get(`https://api.github.com/repos/${commits.dataset.owner}/${commits.dataset.repository}/commits`, function(data) {
  let commitdata = data.map( function(commit) {
    return `<li><p>${commit.sha}</p><p>${commit.commit.message}</p></li>`
  })
  return $('#details').html(`<ul>${commitdata}</ul>`)
}).fail(function(error) {
  displayError(error)
});
}