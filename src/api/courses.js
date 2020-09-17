import apiUrl from '../apiConfig'
import axios from 'axios'

export const create = (courses, user) => {
  console.log(user)
  return axios({
    method: 'POST',
    url: apiUrl + '/admin/api/course/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      course: {
        name: courses.name,
        subject: courses.subject,
        course_description: courses.course_description
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/sign-in/',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out/',
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-pw/',
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
