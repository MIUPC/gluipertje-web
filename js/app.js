let gluipertje = new Gluipertje("https://gluipertje.elisaado.com", 443);

let app = new Vue({
  el: '#app',
  data: {
    user: {},
    messages: []
  }
});

function refreshMessages() {
  console.log("Fetching messages...");
  let messages = [];

  gluipertje.message.all()
    .then(function(rawMessages) {
      for (let rawMessage of rawMessages) {
        messages.push(`<div class="card mx-auto"><div class="card-body text-left"><h5 class="card-title">${rawMessage.from.nickname}</h5><h6 class="card-subtitle mb-2 text-muted">(@${rawMessage.from.username})</h6><br><p class="card-text">${rawMessage.body}</p></div></div><br>`);
      }
      if (messages.length != app.messages.length || app.messages.length == 0) {
        messages.reverse();
        app.messages = messages;
        console.log($(document).height());
        $("html").animate({scrollTop: $(document).height()}, "slow");
      }
    });
}

$(document).ready(function () {
  setInterval(refreshMessages, 1000);
});
