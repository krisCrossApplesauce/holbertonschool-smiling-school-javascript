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


function getTutorials(section) {
	var url = "";
	var carousel = "";
	var loader = "";
	if (section === "Most popular tutorials") {
		url = "https://smileschool-api.hbtn.info/popular-tutorials";
		carousel = "#popular-carousel";
		loader = "#popular-loader";
	}
	else if (section === "Latest videos") {
		url = "https://smileschool-api.hbtn.info/latest-videos";
		carousel = "#latest-carousel";
		loader = "#latest-loader";
	}
	$.ajax({
		url: url,
		method: "GET",
		success: function(data) {
			data.forEach(function(item) {
				var tutorial = '';
				tutorial += `
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
											class="align-self-center m-auto play-overlay"
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
											<div class="rating d-inline-flex">`

				for (i = 0; i < 5; i++) {
					if (i < item.star) {
						tutorial += `
												<img
													src="images/star_on.png"
													alt="star on"
													width="15px"
													height="15px"
												/>`;
					}
					else {
						tutorial += `
												<img
													src="images/star_off.png"
													alt="star on"
													width="15px"
													height="15px"
												/>`;
					}
				}

				tutorial += `
											</div>
											<span class="main-color">${item.duration}</span>
										</div>
									</div>`;

				var card = $('<div>').addClass('card p-3').html(tutorial);
				$(carousel).append(card);
			});
			$(loader).hide();

			$(carousel).slick({
				infinite: false,
				slidesToShow: 3.99,
				slidesToScroll: 1,
				prevArrow: $('.carousel-control-prev'),
				nextArrow: $('.carousel-control-next'),
				responsive: [
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
				]
			});
			$(loader).hide();
			$(carousel).removeClass("d-none");
		},
		error: function() { $(loader).replaceWith('<h1 style="margin: auto; color: white;">ERROR</h1>'); }
	});
}


function getSpecificCourses() {
	const keyword = $('#keywords').value;
	const topic = $('#topic').text();
	const sorting = $('#sorting').text();

	$.ajax({
		url: "https://smileschool-api.hbtn.info/courses",
		method: "GET",
		success: function(data) {
			var specificCourses = [];
			var numOfVideos = 0;

			data.courses.forEach(function(item) {
				for (i in item.keywords) {
					if (i == keyword && (item.topic == topic || topic == "All")) {
						specificCourses += item;

						numOfVideos += 1;
					}
				}
			});

			console.log(specificCourses);

			addCourses(sortCourses(specificCourses, sorting));
			$("#numOfVideos").text(`${numOfVideos} videos`);
		},
		error: function() { console.log("getSpecificCourses ran into an error with the API"); }
	});
}

function sortCourses(courses, sorting) {
	var sortBy = "";
	var tempCourseList = courses;
	var sortedCourses = [];

	if (sorting == "Most Popular") {
		sortBy = 'star';
	}
	if (sorting == "Most Recent") {
		sortBy = 'published_at';
	}
	if (sorting == "Most Viewed") {
		sortBy = 'views';
	}

	var safetyNum = 0;
	while (tempCourseList != [] && safetyNum < 50) {
		var currentMostVideo = {};
		var idx = 0;
		var idxCounter = 0;
		var anotherTempList = [];

		for (vid in tempCourseList) {
			if (currentMostVideo == {}) {
				currentMostVideo = vid;
			}
			if (currentMostVideo[sortBy] < vid[sortBy]) {
				currentMostVideo = vid;
				idx = idxCounter;
			}
			anotherTempList += vid;
			idxCounter++;
		}

		sortedCourses += currentMostVideo;

		tempCourseList = [];
		for (item in anotherTempList) {
			if (i != idx) {
				tempCourseList += item;
			}
		}

		console.log(currentMostVideo[sortBy]);
		safetyNum++;
	}

	return (sortedCourses);
}


function addCourses(sortedCourses) {
	var videos = $('<div id="video-results">');

	for (item in sortedCourses) {
		var video = '';
		video += `
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
					class="align-self-center m-auto play-overlay"
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
					<div class="rating d-inline-flex">`

		for (i = 0; i < 5; i++) {
			if (i < item.star) {
				video += `
						<img
							src="images/star_on.png"
							alt="star on"
							width="15px"
							height="15px"
						/>`;
			}
			else {
				video += `
						<img
							src="images/star_off.png"
							alt="star on"
							width="15px"
							height="15px"
						/>`;
			}
		}

		video += `
					</div>
					<span class="main-color">${item.duration}</span>
				</div>
			</div>`;

		var card = $('<div>').addClass('card p-3').html(video);
		$(videos).append(card);
	}
	$("#loader").hide();
	$("#results-section").append(videos);
}


function selectFromDropdown(dropdown, selection) {
	$(dropdown).text(selection);
	$(dropdown).text(selection);
	getSpecificCourses();
}

function searchKeywords(keyPressed) {
	if (keyPressed === "Enter") {
/*		$("#keywords").value(""); */
		getSpecificCourses();
	}
}


$(document).ready(function() {
	var page_name = window.location.pathname.substring(window.location.pathname.length - 55);

	if (page_name === '/holbertonschool-smiling-school-javascript/courses.html') {
		getSpecificCourses();
	}
	else {
		getQuotes();

		if (page_name === 'holbertonschool-smiling-school-javascript/homepage.html') {
			getTutorials("Most popular tutorials");
			getTutorials("Latest videos");
		}
	}
});
