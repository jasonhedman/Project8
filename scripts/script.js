var grid = $('#grid');
function FirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
var bodyHtml = '';
fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data.results)
    let employees = new Array();
    for(let i = 0; i < data.results.length; i++){
      var employee = new Object();
      employee.name = data.results[i].name.first + ' ' + data.results[i].name.last;
      employee.image = data.results[i].picture.large;
      employee.email = data.results[i].email;
      employee.phone = data.results[i].cell;
      employee.address = data.results[i].location.street + ', ' + data.results[i].location.city + ', ' + data.results[i].location.state + '   ' + data.results[i].location.postcode.toString();
      employee.birthday = 'Birthday: ' +  data.results[i].dob.date.substr(5, 5) + '-' + data.results[i].dob.date.substr(0, 4);
      employee.city = data.results[i].location.city;
      employees.push(employee);
    }
    return employees;
  })
  .then(function(employees){
    for(let i = 0; i < employees.length; i++){
      var cardHtml = '<div class = "card" data-index ="' + i.toString() + '">';
      cardHtml +='<div class = "image-container">'
      cardHtml += '<img src = "' + employees[i].image + '" alt = "" class = "profile-image"></div>';
      cardHtml += '<div class = "information"><h2 class = "name">' + employees[i].name + '</h2>';
      cardHtml += '<p class = "email">' + employees[i].email + '</p><p class = "city">'+ employees[i].city +'</p></div></div>';
      bodyHtml += cardHtml;
    }
    $('#grid').html(bodyHtml);
    return employees;
  })
  .then(function(employees){
    var modal = $('.modal');
    var modalContent = $('.modal-content');
    var card = $('.card');
    var deleteButton = $('.close-button');
    var employeeIndex;
    console.log(card);

    function changeData() {
      var employeeData = employees[employeeIndex];
      var name = $('#modal-name');
      var email = $('#modal-email');
      var city = $('#modal-city');
      var phone = $('#modal-phone');
      var address = $('#modal-address');
      var birthday = $('#modal-birthday');
      var image = $('#modal-image');
      name.text(employeeData.name);
      email.text(employeeData.email);
      city.text(employeeData.city);
      phone.text(employeeData.phone);
      address.text(employeeData.address);
      birthday.text(employeeData.birthday);
      image.attr('src', employeeData.image);
    }

    var dataIndex = card.click(function(){
      modal[0].classList.add('show-modal')
      employeeIndex = $(this).data('index')
      changeData();
      if(employeeIndex === 0) {
        left[0].style.display = 'none';
      } else if(employeeIndex === 11){
        right[0].style.display = 'none';
      } else {
        left[0].style.display = 'block';
        right[0].style.display = 'block';
      }
    });


    deleteButton.click(function() {
      modal[0].classList.remove('show-modal');
      console.log(dataIndex);
    })

    $(window).click(function(e){
      if (e.target == modal[0]){
        modal[0].classList.remove('show-modal');
      }
    })

    var left = $('.arrow-left');
    var right = $('.arrow-right');
    var arrow = $('.arrow');
    console.log(right[0]);

    arrow.click(function(){
      if(this === right[0]){
        employeeIndex += 1;
        console.log(employeeIndex)
      } else if(this === left[0]) {
        employeeIndex -= 1;
        console.log(employeeIndex)
      }
      if(employeeIndex === 0) {
        left[0].style.display = 'none';
      } else if(employeeIndex === 11){
        right[0].style.display = 'none';
      } else {
        left[0].style.display = 'block';
        right[0].style.display = 'block';
      }

      changeData();
    });

    $("#search").keyup( function() {
      console.log($(this).val());
      var value = $(this).val().toLowerCase();
      $(".card .name").filter(function() {
        $($(this).parent().parent()).toggle($(this).text().toLowerCase().substr(0, value.length) == value )
      });
    });


  })
