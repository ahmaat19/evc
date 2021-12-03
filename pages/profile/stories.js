import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import Message from '../../components/Message'
import Loader from 'react-loader-spinner'
import {
  FaCheckCircle,
  FaEdit,
  FaPlus,
  FaTimesCircle,
  FaTrash,
} from 'react-icons/fa'
import {
  getStories,
  deleteStory,
  updateStory,
  addStory,
} from '../../api/stories'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import {
  dynamicInputSelect,
  inputCheckBox,
  inputNumber,
  inputText,
  inputTextArea,
  staticInputSelect,
} from '../../utils/dynamicForm'

const Stories = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: 'public',
    },
  })

  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery(
    'stories',
    () => getStories(),
    {
      retry: 0,
    }
  )

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: updateMutateAsync,
  } = useMutation(updateStory, {
    retry: 0,
    onSuccess: () => {
      reset()
      setEdit(false)
      queryClient.invalidateQueries(['stories'])
    },
  })

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: deleteMutateAsync,
  } = useMutation(deleteStory, {
    retry: 0,
    onSuccess: () => queryClient.invalidateQueries(['stories']),
  })

  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    error: errorAdd,
    isSuccess: isSuccessAdd,
    mutateAsync: addMutateAsync,
  } = useMutation(addStory, {
    retry: 0,
    onSuccess: () => {
      reset()
      setEdit(false)
      queryClient.invalidateQueries(['stories'])
    },
  })

  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)

  const submitHandler = (data) => {
    edit
      ? updateMutateAsync({
          _id: id,
          title: data.title,
          type: data.type,
          content: data.content,
          tag: data.tag,
        })
      : addMutateAsync(data)
  }

  const editHandler = (story) => {
    setId(story._id)
    setEdit(true)
    setValue('title', story.title)
    setValue('type', story.type)
    setValue('content', story.content)
    setValue('tag', story.tag)
  }

  return (
    <div>
      <Link href='/'>
        <a>
          <button className='btn btn-danger btn-sm rounded-pill shadow-lg animate__bounceIn'>
            <FaTimesCircle className='mb-1' /> Cancel
          </button>
        </a>
      </Link>
      <h6 className='text-center text-info'>
        Create new story or Update existed story
      </h6>

      <Head>
        <title>Stories</title>
        <meta property='og:title' content='Stories' key='title' />
      </Head>

      {isSuccessUpdate && (
        <Message variant='success'>
          Story has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {isSuccessAdd && (
        <Message variant='success'>
          Story has been Created successfully.
        </Message>
      )}
      {isErrorAdd && <Message variant='danger'>{errorAdd}</Message>}
      {isSuccessDelete && (
        <Message variant='success'>
          Story has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {isLoading ? (
        <div className='text-center'>
          <Loader
            type='ThreeDots'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='row'>
          <div className='col-md-4 col-12'>
            <form onSubmit={handleSubmit(submitHandler)}>
              {inputText({
                register,
                label: 'Title',
                errors,
                name: 'title',
              })}
              {inputText({
                register,
                label: 'Tag',
                errors,
                name: 'tag',
              })}
              {staticInputSelect({
                register,
                errors,
                data: [{ name: 'public' }, { name: 'private' }],
                name: 'type',
                label: 'Type',
              })}
              {inputTextArea({
                register,
                errors,
                label: 'Content',
                name: 'content',
              })}
              <button
                type='submit'
                className='btn btn-primary form-control'
                disabled={isLoadingAdd || isLoadingUpdate}
              >
                {isLoadingAdd || isLoadingUpdate ? (
                  <span className='spinner-border spinner-border-sm' />
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
          <div className='col-md-8 col-12'>
            <>
              <div className='table-responsive '>
                <table className='table table-striped table-hover table-sm caption-top '>
                  <caption>{data && data.length} records were found</caption>
                  <thead>
                    <tr>
                      <th>TITLE</th>
                      <th>TYPE</th>
                      <th># LIKES</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((story) => (
                        <tr key={story._id}>
                          <td>{story.title}</td>
                          <td>{story.type}</td>
                          <td>{story.like}</td>

                          {/* <td>
                              {course.isActive ? (
                                <FaCheckCircle className='text-success mb-1' />
                              ) : (
                                <FaTimesCircle className='text-danger mb-1' />
                              )}
                            </td> */}

                          <td className='btn-group'>
                            <button
                              className='btn btn-primary btn-sm'
                              onClick={() => editHandler(story)}
                            >
                              <FaEdit className='mb-1' /> Edit
                            </button>

                            {/* <button
                                className='btn btn-danger btn-sm'
                                onClick={() => deleteHandler(story._id)}
                                disabled={isLoadingDelete}
                              >
                                {isLoadingDelete ? (
                                  <span className='spinner-border spinner-border-sm' />
                                ) : (
                                  <span>
                                    {' '}
                                    <FaTrash className='mb-1' /> Delete
                                  </span>
                                )}
                              </button> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stories

export const getServerSideProps = withPageAuthRequired()
