function captureData() {
  let texto = document.getElementById('id_search').value;
  let checks = Array.from(document.querySelectorAll('.class_checks:checked')).map(each => each.value);
  let filtro = events.filter(each => {
      return (each.name.toLowerCase().includes(texto.toLowerCase())) && (checks.length === 0 || checks.includes(each.category));
  })
  console.log(filtro);
  if (filtro.length>0) {
      printTemplates('#cards', filtro);
  } else {
      notFound('#cards');
  }
}
