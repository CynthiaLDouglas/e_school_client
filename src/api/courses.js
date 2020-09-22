import apiUrl from '../apiConfig'
import axios from 'axios'

export const createCourse = (user, course) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/courses/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      course: {
        name: course.name,
        subject: course.subject,
        course_description: course.course_description
      }
    }
  })
}

export const allCourses = (user, owner) => {
  return axios({
    url: apiUrl + '/courses/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const showCourse = (user, id) => {
  return axios({
    url: apiUrl + `/courses/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const updateCourse = (user, course, id) => {
  return axios({
    url: apiUrl + `/courses/${id}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: { course }
  })
}

export const destroyCourse = (user, id) => {
  return axios({
    url: apiUrl + `/courses/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}
