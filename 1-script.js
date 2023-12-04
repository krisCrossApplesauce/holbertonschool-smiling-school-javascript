function getQuotes() {
	$.ajax({
		url: "https://smileschool-api.hbtn.info/quotes",
		method: "GET",
		success: function(data) {
			var quotes = '<div class="carousel-inner" id="carousel-inner-quotes">';
			data.forEach(function(item, index) {
				if (index == 0) {
					quotes += '<div class="carousel-item active">';
				}
				else {
					quotes += '<div class="carousel-item">';
				}
				quotes += `
							<div class="row mx-auto align-items-center">
								<div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
									<img
										src="${item.pic_url}"
										class="d-block align-self-center"
										alt="Carousel Pic ${item.id}"
									/>
								</div>
								<div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
									<div class="quote-text">
										<p class="text-white">${item.text}</p>
										<h4 class="text-white font-weight-bold">${item.name}</h4>
										<span class="text-white">${item.title}</span>
									</div>
								</div>
							</div>
						</div>`;
			});
			$("#carousel-inner-quotes").replaceWith(quotes);
			$("#loader").hide();
			$("#not-loader").removeAttr("hidden");
		},
		error: function() { $("#loader").replaceWith('<h1 style="margin: auto; color: white;">ERROR</h1>'); }
	});
}

$(document).ready(function() {
	getQuotes();
});
