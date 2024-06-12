// search.js

export function handleSearch() {
    const searchPopup = document.getElementById('searchPopup');
    searchPopup.style.display = 'block'; // 검색창 보이기
}

export function handleSearchClose() {
    const searchPopup = document.getElementById('searchPopup');
    searchPopup.style.display = 'none';
}

export function searchRecipes() {
    const input = document.getElementById('recipeSearchInput').value;
    console.log("검색어:", input); // 실제로는 여기에 검색 결과 페이지로 이동하거나 결과를 표시하는 로직이 필요
}
