const holeOfActor = document.getElementById("holeOfActor");
const holeOfActor2 = document.getElementById("holeOfActor2");

async function getActor() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/person/day?api_key=964229305065dd1ee3856990531a8f15`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getActor2() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=964229305065dd1ee3856990531a8f15`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}
async function displayMoviesList(container, fetchDataFunction) {
  const moviesData = await fetchDataFunction();
  moviesData.forEach(async (actor) => {
    const actorList = document.createElement("div");
    actorList.classList.add("card2");
    const actorImg = document.createElement("img");
    actorImg.classList.add("card-img-top1");
    const imgURL = `https://www.themoviedb.org/t/p/w470_and_h470_face/${actor.profile_path}`;
    if (actor.profile_path) {
      actorImg.src = imgURL;
    } else {
      actorImg.src = `https://placehold.co/800?text=${actor.original_name}&font=playfair`;
    }
    actorList.addEventListener("click", () => {
      window.location.href = `/Single%20Actor%20Page/SingleActorPage.html?id=${actor.id}`;
    });
    actorImg.alt = actor.original_name;
    actorImg.title = actor.original_name;
    const cardBody = document.createElement("div");
    const nameAndRelease = document.createElement("div");
    nameAndRelease.classList.add("nameAndRelease");
    cardBody.classList.add("card-body1");
    const actorTitle = document.createElement("h5");
    actorTitle.classList.add("card-title1");
    actorTitle.textContent = actor.name;
    const known_for_department = document.createElement("h6");
    known_for_department.classList.add("card-text");
    known_for_department.innerHTML = actor.known_for_department;
    const voteAverage = document.createElement("h6");
    voteAverage.classList.add("voteAverage");
    voteAverage.innerHTML = `  ${actor.popularity}`;
    // console.log(actor);
    container.appendChild(actorList);
    actorList.appendChild(actorImg);
    actorList.appendChild(cardBody);
    cardBody.appendChild(nameAndRelease);
    nameAndRelease.appendChild(actorTitle);
    nameAndRelease.appendChild(voteAverage);
    cardBody.appendChild(known_for_department);
  });
}
displayMoviesList(holeOfActor, getActor);
displayMoviesList(holeOfActor2, getActor2);
