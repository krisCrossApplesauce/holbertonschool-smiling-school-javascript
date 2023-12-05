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


function getTutorials() {
	$.ajax({
		url: "https://smileschool-api.hbtn.info/popular-tutorials",
		method: "GET",
		success: function(data) {
			var tutorials = `<div class="carousel" id="tutorial-carousel">`;
			data.forEach(function(item) {
				tutorials += `
								<div class="card">
									<img
										src="${item.thumb_url}"
										class="card-img-top"
										alt="Video thumbnail"
									/>
									<div class="card-img-overlay text-center">
										<img
											src="images/play.png"
											alt="Play"
											width="64px"
											class="align-self-center play-overlay"
										/>
									</div>
									<div class="card-body">
										<h5 class="card-title font-weight-bold">
											${item.title}
										</h5>
										<p class="card-text text-muted">
											${item['sub-title']}
										</p>
										<div class="creator d-flex align-items-center">
											<img
												src="${item.author_pic_url}"
												alt="Creator of
												Video"
												width="30px"
												class="rounded-circle"
											/>
											<h6 class="pl-3 m-0 main-color">${item.author}</h6>
										</div>
										<div class="info pt-3 d-flex justify-content-between">
											<div class="rating">`
				for (i = 0; i < 5; i++) {
					if (i < item.star) {
						tutorials += `
												<img
													src="images/star_on.png"
													alt="star on"
													width="15px"
												/>`;
					}
					else {
						tutorials += `
												<img
													src="images/star_off.png"
													alt="star on"
													width="15px"
												/>`;
					}
				}

				tutorials += `
											</div>
										<span class="main-color">${item.duration}</span>
									</div>
								</div>
							</div>`;
			});
/*			tutorials += `</div>`; */
			$("#tutorial-carousel").replaceWith(tutorials);
			$("#tutorial-loader").hide();
			$("#tutorial-carousel").slick({
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 4,
/**
				autoplay: true,
				autoplaySpeed: 2000, */
				prevArrow: $('.carousel-control-prev'),
				nextArrow: $('.carousel-control-next'),
/**				responsive: [
					{
						breakpoint: 992,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1
						}
					}
				] */
			});
		},
		error: function() { $("#tutorial-loader").replaceWith('<h1 style="margin: auto; color: white;">ERROR</h1>'); }
	});
}


$(document).ready(function() {
	getQuotes();
	getTutorials();
});
