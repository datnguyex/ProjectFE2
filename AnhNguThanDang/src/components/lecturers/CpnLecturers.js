
export function getLecturers() {
    return fetch("http://localhost:4000/lecturers")
  };
  
  
  export function deleteLecturer(id) {
    return fetch("http://localhost:4000/lecturers/" + id, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
          return getLecturers();
        }
    });
}
export async function CreateLecture(event) {
  const formData = new FormData(event.target)

  // const lecturer_certificate = ("lecturer_certificate",[
  //     formData.get("lecturer_certificate1"),
  //     formData.get("lecturer_certificate2"),
  //     formData.get("lecturer_certificate3"),
  //     formData.get("lecturer_certificate4")
  // ]);
  const formDataLecturer = new FormData();
  formDataLecturer.append("lecturer_img",formData.get('lecturer_img'));
  formDataLecturer.append("lecturer_name",formData.get('lecturer_name'));
  formDataLecturer.append("lecturer_description",formData.get('lecturer_description'));
  formDataLecturer.append("lecturer_certificate",[
      formData.get('lecturer_certificate1'),
      formData.get('lecturer_certificate2'),
      formData.get('lecturer_certificate3'),
      formData.get('lecturer_certificate4')
  ]);
  
  formData.delete("lecturer_certificate1");   
  formData.delete("lecturer_certificate2");
  formData.delete("lecturer_certificate3");
  formData.delete("lecturer_certificate4");

  return await fetch("http://localhost:4000/lecturers",{
      method: "POST",
      body: formDataLecturer,
});
}
export function getLectureById(id) {
  return fetch("http://localhost:4000/lecturers/"+ id)
}
export async function UpdateLecture(id,event) {
  const formData = new FormData(event.target)
  const formDataLecturer = new FormData();
  formDataLecturer.append("lecturer_img",formData.get('lecturer_img'));
  formDataLecturer.append("lecturer_name",formData.get('lecturer_name'));
  formDataLecturer.append("lecturer_description",formData.get('lecturer_description'));
  formDataLecturer.append("lecturer_certificate",[
      formData.get('lecturer_certificate1'),
      formData.get('lecturer_certificate2'),
      formData.get('lecturer_certificate3'),
      formData.get('lecturer_certificate4')
  ]);
  
  formData.delete("lecturer_certificate1");   
  formData.delete("lecturer_certificate2");
  formData.delete("lecturer_certificate3");
  formData.delete("lecturer_certificate4");

  return await fetch(`http://localhost:4000/lecturers/${id}`, {
        method: "PATCH",
        body: formDataLecturer,
});
}
