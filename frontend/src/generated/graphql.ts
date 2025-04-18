import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Assignment = {
  __typename?: 'Assignment';
  chapter?: Maybe<Chapter>;
  createdAt: Scalars['DateTime']['output'];
  dueAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  status: Status;
  subject: Subject;
  tasks?: Maybe<Array<Task>>;
  title: Scalars['String']['output'];
};

export type Chapter = {
  __typename?: 'Chapter';
  assignments?: Maybe<Array<Assignment>>;
  createdAt: Scalars['DateTime']['output'];
  examPassed: Scalars['Boolean']['output'];
  exams?: Maybe<Array<Exam>>;
  id: Scalars['ID']['output'];
  subject: Subject;
  title: Scalars['String']['output'];
};

export type CreateAssignmentInput = {
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  dueAt: Scalars['String']['input'];
  status: Status;
  subjectId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type CreateChapterInput = {
  examPassed: Scalars['Boolean']['input'];
  subjectId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type CreateExamInput = {
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  date: Scalars['DateTime']['input'];
  duration: Scalars['Float']['input'];
  subjectId: Scalars['ID']['input'];
};

export type CreateRevisionPlanInput = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateSubjectInput = {
  color: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateTaskInput = {
  assignmentId?: InputMaybe<Scalars['ID']['input']>;
  done: Scalars['Boolean']['input'];
  duration: Scalars['Float']['input'];
  examId?: InputMaybe<Scalars['ID']['input']>;
  revisionPlanId?: InputMaybe<Scalars['ID']['input']>;
  scheduledAt: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Exam = {
  __typename?: 'Exam';
  chapter?: Maybe<Chapter>;
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  subject: Subject;
  tasks?: Maybe<Array<Task>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAssignment: Assignment;
  createChapter: Chapter;
  createExam: Exam;
  createRevisionPlan: RevisionPlan;
  createSubject: Subject;
  createTask: Task;
  deleteAssignment: Scalars['Boolean']['output'];
  deleteExam: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
};


export type MutationCreateAssignmentArgs = {
  data: CreateAssignmentInput;
};


export type MutationCreateChapterArgs = {
  data: CreateChapterInput;
};


export type MutationCreateExamArgs = {
  data: CreateExamInput;
};


export type MutationCreateRevisionPlanArgs = {
  data: CreateRevisionPlanInput;
};


export type MutationCreateSubjectArgs = {
  data: CreateSubjectInput;
};


export type MutationCreateTaskArgs = {
  data: CreateTaskInput;
};


export type MutationDeleteAssignmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteExamArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllAssignments: Array<Assignment>;
  getAllChapters: Array<Chapter>;
  getAllExams: Array<Exam>;
  getAllRevisionPlans: Array<RevisionPlan>;
  getAllTasks: Array<Task>;
  getSubjects: Array<Subject>;
  getTasksByDate: Array<Task>;
};


export type QueryGetTasksByDateArgs = {
  date: Scalars['String']['input'];
};

export type RevisionPlan = {
  __typename?: 'RevisionPlan';
  createdAt: Scalars['DateTime']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  startDate: Scalars['DateTime']['output'];
  tasks?: Maybe<Array<Task>>;
  title: Scalars['String']['output'];
};

export enum Status {
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export type Subject = {
  __typename?: 'Subject';
  assignments?: Maybe<Array<Assignment>>;
  chapters?: Maybe<Array<Chapter>>;
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  exams?: Maybe<Array<Exam>>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Task = {
  __typename?: 'Task';
  assignment?: Maybe<Assignment>;
  createdAt: Scalars['DateTime']['output'];
  done: Scalars['Boolean']['output'];
  duration: Scalars['Float']['output'];
  exam?: Maybe<Exam>;
  id: Scalars['ID']['output'];
  revisionPlan?: Maybe<RevisionPlan>;
  scheduledAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GetAllAssignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAssignmentsQuery = { __typename?: 'Query', getAllAssignments: Array<{ __typename?: 'Assignment', id: string, title: string, dueAt: any, status: Status, subject: { __typename?: 'Subject', id: string, name: string } }> };

export type DeleteAssignmentMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteAssignmentMutation = { __typename?: 'Mutation', deleteAssignment: boolean };

export type GetAtAGlanceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAtAGlanceQuery = { __typename?: 'Query', getAllTasks: Array<{ __typename?: 'Task', done: boolean, duration: number, scheduledAt: any }>, getAllExams: Array<{ __typename?: 'Exam', date: any }>, getAllAssignments: Array<{ __typename?: 'Assignment', dueAt: any }> };

export type GetAllChaptersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllChaptersQuery = { __typename?: 'Query', getAllChapters: Array<{ __typename?: 'Chapter', id: string, title: string, examPassed: boolean, subject: { __typename?: 'Subject', id: string, name: string } }> };

export type CreateAssignmentMutationVariables = Exact<{
  title: Scalars['String']['input'];
  dueAt: Scalars['String']['input'];
  subjectId: Scalars['ID']['input'];
  chapterId?: InputMaybe<Scalars['ID']['input']>;
  status: Status;
}>;


export type CreateAssignmentMutation = { __typename?: 'Mutation', createAssignment: { __typename?: 'Assignment', id: string, title: string, dueAt: any, subject: { __typename?: 'Subject', name: string } } };

export type CreateChapterMutationVariables = Exact<{
  title: Scalars['String']['input'];
  examPassed: Scalars['Boolean']['input'];
  subjectId: Scalars['ID']['input'];
}>;


export type CreateChapterMutation = { __typename?: 'Mutation', createChapter: { __typename?: 'Chapter', id: string, title: string, examPassed: boolean, subject: { __typename?: 'Subject', name: string } } };

export type CreateExamMutationVariables = Exact<{
  date: Scalars['DateTime']['input'];
  duration: Scalars['Float']['input'];
  subjectId: Scalars['ID']['input'];
  chapterId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateExamMutation = { __typename?: 'Mutation', createExam: { __typename?: 'Exam', id: string, date: any, duration: number, subject: { __typename?: 'Subject', name: string } } };

export type CreateRevisionPlanMutationVariables = Exact<{
  title: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
  endDate: Scalars['String']['input'];
}>;


export type CreateRevisionPlanMutation = { __typename?: 'Mutation', createRevisionPlan: { __typename?: 'RevisionPlan', id: string, title: string, startDate: any, endDate: any } };

export type CreateSubjectMutationVariables = Exact<{
  name: Scalars['String']['input'];
  color: Scalars['String']['input'];
  icon: Scalars['String']['input'];
}>;


export type CreateSubjectMutation = { __typename?: 'Mutation', createSubject: { __typename?: 'Subject', id: string, name: string, color?: string | null, icon?: string | null } };

export type CreateTaskMutationVariables = Exact<{
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  scheduledAt: Scalars['String']['input'];
  duration: Scalars['Float']['input'];
  revisionPlanId?: InputMaybe<Scalars['ID']['input']>;
  assignmentId?: InputMaybe<Scalars['ID']['input']>;
  examId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string, title: string, type: string, scheduledAt: any, duration: number } };

export type GetAllExamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllExamsQuery = { __typename?: 'Query', getAllExams: Array<{ __typename?: 'Exam', id: string, date: any, duration: number, subject: { __typename?: 'Subject', id: string, name: string } }> };

export type DeleteExamMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteExamMutation = { __typename?: 'Mutation', deleteExam: boolean };

export type GetAllRevisionPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRevisionPlansQuery = { __typename?: 'Query', getAllRevisionPlans: Array<{ __typename?: 'RevisionPlan', id: string, title: string, startDate: any, endDate: any, tasks?: Array<{ __typename?: 'Task', id: string, title: string, type: string, scheduledAt: any, duration: number }> | null }> };

export type GetSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsQuery = { __typename?: 'Query', getSubjects: Array<{ __typename?: 'Subject', id: string, name: string, color?: string | null, icon?: string | null }> };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', getAllTasks: Array<{ __typename?: 'Task', id: string, title: string, type: string, scheduledAt: any, duration: number, done: boolean }> };

export type GetTasksByDateQueryVariables = Exact<{
  date: Scalars['String']['input'];
}>;


export type GetTasksByDateQuery = { __typename?: 'Query', getTasksByDate: Array<{ __typename?: 'Task', id: string, title: string, scheduledAt: any, type: string, duration: number, done: boolean }> };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: boolean };


export const GetAllAssignmentsDocument = gql`
    query GetAllAssignments {
  getAllAssignments {
    id
    title
    dueAt
    status
    subject {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAllAssignmentsQuery__
 *
 * To run a query within a React component, call `useGetAllAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAssignmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAssignmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAssignmentsQuery, GetAllAssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAssignmentsQuery, GetAllAssignmentsQueryVariables>(GetAllAssignmentsDocument, options);
      }
export function useGetAllAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAssignmentsQuery, GetAllAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAssignmentsQuery, GetAllAssignmentsQueryVariables>(GetAllAssignmentsDocument, options);
        }
export function useGetAllAssignmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllAssignmentsQuery, GetAllAssignmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllAssignmentsQuery, GetAllAssignmentsQueryVariables>(GetAllAssignmentsDocument, options);
        }
export type GetAllAssignmentsQueryHookResult = ReturnType<typeof useGetAllAssignmentsQuery>;
export type GetAllAssignmentsLazyQueryHookResult = ReturnType<typeof useGetAllAssignmentsLazyQuery>;
export type GetAllAssignmentsSuspenseQueryHookResult = ReturnType<typeof useGetAllAssignmentsSuspenseQuery>;
export type GetAllAssignmentsQueryResult = Apollo.QueryResult<GetAllAssignmentsQuery, GetAllAssignmentsQueryVariables>;
export const DeleteAssignmentDocument = gql`
    mutation DeleteAssignment($id: String!) {
  deleteAssignment(id: $id)
}
    `;
export type DeleteAssignmentMutationFn = Apollo.MutationFunction<DeleteAssignmentMutation, DeleteAssignmentMutationVariables>;

/**
 * __useDeleteAssignmentMutation__
 *
 * To run a mutation, you first call `useDeleteAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAssignmentMutation, { data, loading, error }] = useDeleteAssignmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAssignmentMutation, DeleteAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAssignmentMutation, DeleteAssignmentMutationVariables>(DeleteAssignmentDocument, options);
      }
export type DeleteAssignmentMutationHookResult = ReturnType<typeof useDeleteAssignmentMutation>;
export type DeleteAssignmentMutationResult = Apollo.MutationResult<DeleteAssignmentMutation>;
export type DeleteAssignmentMutationOptions = Apollo.BaseMutationOptions<DeleteAssignmentMutation, DeleteAssignmentMutationVariables>;
export const GetAtAGlanceDocument = gql`
    query GetAtAGlance {
  getAllTasks {
    done
    duration
    scheduledAt
  }
  getAllExams {
    date
  }
  getAllAssignments {
    dueAt
  }
}
    `;

/**
 * __useGetAtAGlanceQuery__
 *
 * To run a query within a React component, call `useGetAtAGlanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAtAGlanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAtAGlanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAtAGlanceQuery(baseOptions?: Apollo.QueryHookOptions<GetAtAGlanceQuery, GetAtAGlanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAtAGlanceQuery, GetAtAGlanceQueryVariables>(GetAtAGlanceDocument, options);
      }
export function useGetAtAGlanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAtAGlanceQuery, GetAtAGlanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAtAGlanceQuery, GetAtAGlanceQueryVariables>(GetAtAGlanceDocument, options);
        }
export function useGetAtAGlanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAtAGlanceQuery, GetAtAGlanceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAtAGlanceQuery, GetAtAGlanceQueryVariables>(GetAtAGlanceDocument, options);
        }
export type GetAtAGlanceQueryHookResult = ReturnType<typeof useGetAtAGlanceQuery>;
export type GetAtAGlanceLazyQueryHookResult = ReturnType<typeof useGetAtAGlanceLazyQuery>;
export type GetAtAGlanceSuspenseQueryHookResult = ReturnType<typeof useGetAtAGlanceSuspenseQuery>;
export type GetAtAGlanceQueryResult = Apollo.QueryResult<GetAtAGlanceQuery, GetAtAGlanceQueryVariables>;
export const GetAllChaptersDocument = gql`
    query GetAllChapters {
  getAllChapters {
    id
    title
    examPassed
    subject {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAllChaptersQuery__
 *
 * To run a query within a React component, call `useGetAllChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllChaptersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllChaptersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllChaptersQuery, GetAllChaptersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllChaptersQuery, GetAllChaptersQueryVariables>(GetAllChaptersDocument, options);
      }
export function useGetAllChaptersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllChaptersQuery, GetAllChaptersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllChaptersQuery, GetAllChaptersQueryVariables>(GetAllChaptersDocument, options);
        }
export function useGetAllChaptersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllChaptersQuery, GetAllChaptersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllChaptersQuery, GetAllChaptersQueryVariables>(GetAllChaptersDocument, options);
        }
export type GetAllChaptersQueryHookResult = ReturnType<typeof useGetAllChaptersQuery>;
export type GetAllChaptersLazyQueryHookResult = ReturnType<typeof useGetAllChaptersLazyQuery>;
export type GetAllChaptersSuspenseQueryHookResult = ReturnType<typeof useGetAllChaptersSuspenseQuery>;
export type GetAllChaptersQueryResult = Apollo.QueryResult<GetAllChaptersQuery, GetAllChaptersQueryVariables>;
export const CreateAssignmentDocument = gql`
    mutation CreateAssignment($title: String!, $dueAt: String!, $subjectId: ID!, $chapterId: ID, $status: Status!) {
  createAssignment(
    data: {title: $title, dueAt: $dueAt, subjectId: $subjectId, chapterId: $chapterId, status: $status}
  ) {
    id
    title
    dueAt
    subject {
      name
    }
  }
}
    `;
export type CreateAssignmentMutationFn = Apollo.MutationFunction<CreateAssignmentMutation, CreateAssignmentMutationVariables>;

/**
 * __useCreateAssignmentMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentMutation, { data, loading, error }] = useCreateAssignmentMutation({
 *   variables: {
 *      title: // value for 'title'
 *      dueAt: // value for 'dueAt'
 *      subjectId: // value for 'subjectId'
 *      chapterId: // value for 'chapterId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useCreateAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssignmentMutation, CreateAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssignmentMutation, CreateAssignmentMutationVariables>(CreateAssignmentDocument, options);
      }
export type CreateAssignmentMutationHookResult = ReturnType<typeof useCreateAssignmentMutation>;
export type CreateAssignmentMutationResult = Apollo.MutationResult<CreateAssignmentMutation>;
export type CreateAssignmentMutationOptions = Apollo.BaseMutationOptions<CreateAssignmentMutation, CreateAssignmentMutationVariables>;
export const CreateChapterDocument = gql`
    mutation CreateChapter($title: String!, $examPassed: Boolean!, $subjectId: ID!) {
  createChapter(
    data: {title: $title, examPassed: $examPassed, subjectId: $subjectId}
  ) {
    id
    title
    examPassed
    subject {
      name
    }
  }
}
    `;
export type CreateChapterMutationFn = Apollo.MutationFunction<CreateChapterMutation, CreateChapterMutationVariables>;

/**
 * __useCreateChapterMutation__
 *
 * To run a mutation, you first call `useCreateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChapterMutation, { data, loading, error }] = useCreateChapterMutation({
 *   variables: {
 *      title: // value for 'title'
 *      examPassed: // value for 'examPassed'
 *      subjectId: // value for 'subjectId'
 *   },
 * });
 */
export function useCreateChapterMutation(baseOptions?: Apollo.MutationHookOptions<CreateChapterMutation, CreateChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChapterMutation, CreateChapterMutationVariables>(CreateChapterDocument, options);
      }
export type CreateChapterMutationHookResult = ReturnType<typeof useCreateChapterMutation>;
export type CreateChapterMutationResult = Apollo.MutationResult<CreateChapterMutation>;
export type CreateChapterMutationOptions = Apollo.BaseMutationOptions<CreateChapterMutation, CreateChapterMutationVariables>;
export const CreateExamDocument = gql`
    mutation CreateExam($date: DateTime!, $duration: Float!, $subjectId: ID!, $chapterId: ID) {
  createExam(
    data: {date: $date, duration: $duration, subjectId: $subjectId, chapterId: $chapterId}
  ) {
    id
    date
    duration
    subject {
      name
    }
  }
}
    `;
export type CreateExamMutationFn = Apollo.MutationFunction<CreateExamMutation, CreateExamMutationVariables>;

/**
 * __useCreateExamMutation__
 *
 * To run a mutation, you first call `useCreateExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExamMutation, { data, loading, error }] = useCreateExamMutation({
 *   variables: {
 *      date: // value for 'date'
 *      duration: // value for 'duration'
 *      subjectId: // value for 'subjectId'
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useCreateExamMutation(baseOptions?: Apollo.MutationHookOptions<CreateExamMutation, CreateExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExamMutation, CreateExamMutationVariables>(CreateExamDocument, options);
      }
export type CreateExamMutationHookResult = ReturnType<typeof useCreateExamMutation>;
export type CreateExamMutationResult = Apollo.MutationResult<CreateExamMutation>;
export type CreateExamMutationOptions = Apollo.BaseMutationOptions<CreateExamMutation, CreateExamMutationVariables>;
export const CreateRevisionPlanDocument = gql`
    mutation CreateRevisionPlan($title: String!, $startDate: String!, $endDate: String!) {
  createRevisionPlan(
    data: {title: $title, startDate: $startDate, endDate: $endDate}
  ) {
    id
    title
    startDate
    endDate
  }
}
    `;
export type CreateRevisionPlanMutationFn = Apollo.MutationFunction<CreateRevisionPlanMutation, CreateRevisionPlanMutationVariables>;

/**
 * __useCreateRevisionPlanMutation__
 *
 * To run a mutation, you first call `useCreateRevisionPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRevisionPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRevisionPlanMutation, { data, loading, error }] = useCreateRevisionPlanMutation({
 *   variables: {
 *      title: // value for 'title'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useCreateRevisionPlanMutation(baseOptions?: Apollo.MutationHookOptions<CreateRevisionPlanMutation, CreateRevisionPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRevisionPlanMutation, CreateRevisionPlanMutationVariables>(CreateRevisionPlanDocument, options);
      }
export type CreateRevisionPlanMutationHookResult = ReturnType<typeof useCreateRevisionPlanMutation>;
export type CreateRevisionPlanMutationResult = Apollo.MutationResult<CreateRevisionPlanMutation>;
export type CreateRevisionPlanMutationOptions = Apollo.BaseMutationOptions<CreateRevisionPlanMutation, CreateRevisionPlanMutationVariables>;
export const CreateSubjectDocument = gql`
    mutation CreateSubject($name: String!, $color: String!, $icon: String!) {
  createSubject(data: {name: $name, color: $color, icon: $icon}) {
    id
    name
    color
    icon
  }
}
    `;
export type CreateSubjectMutationFn = Apollo.MutationFunction<CreateSubjectMutation, CreateSubjectMutationVariables>;

/**
 * __useCreateSubjectMutation__
 *
 * To run a mutation, you first call `useCreateSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubjectMutation, { data, loading, error }] = useCreateSubjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      color: // value for 'color'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useCreateSubjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubjectMutation, CreateSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubjectMutation, CreateSubjectMutationVariables>(CreateSubjectDocument, options);
      }
export type CreateSubjectMutationHookResult = ReturnType<typeof useCreateSubjectMutation>;
export type CreateSubjectMutationResult = Apollo.MutationResult<CreateSubjectMutation>;
export type CreateSubjectMutationOptions = Apollo.BaseMutationOptions<CreateSubjectMutation, CreateSubjectMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($title: String!, $type: String!, $scheduledAt: String!, $duration: Float!, $revisionPlanId: ID, $assignmentId: ID, $examId: ID) {
  createTask(
    data: {title: $title, type: $type, scheduledAt: $scheduledAt, duration: $duration, done: false, revisionPlanId: $revisionPlanId, assignmentId: $assignmentId, examId: $examId}
  ) {
    id
    title
    type
    scheduledAt
    duration
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      title: // value for 'title'
 *      type: // value for 'type'
 *      scheduledAt: // value for 'scheduledAt'
 *      duration: // value for 'duration'
 *      revisionPlanId: // value for 'revisionPlanId'
 *      assignmentId: // value for 'assignmentId'
 *      examId: // value for 'examId'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const GetAllExamsDocument = gql`
    query GetAllExams {
  getAllExams {
    id
    date
    duration
    subject {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAllExamsQuery__
 *
 * To run a query within a React component, call `useGetAllExamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllExamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllExamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllExamsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllExamsQuery, GetAllExamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllExamsQuery, GetAllExamsQueryVariables>(GetAllExamsDocument, options);
      }
export function useGetAllExamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllExamsQuery, GetAllExamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllExamsQuery, GetAllExamsQueryVariables>(GetAllExamsDocument, options);
        }
export function useGetAllExamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllExamsQuery, GetAllExamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllExamsQuery, GetAllExamsQueryVariables>(GetAllExamsDocument, options);
        }
export type GetAllExamsQueryHookResult = ReturnType<typeof useGetAllExamsQuery>;
export type GetAllExamsLazyQueryHookResult = ReturnType<typeof useGetAllExamsLazyQuery>;
export type GetAllExamsSuspenseQueryHookResult = ReturnType<typeof useGetAllExamsSuspenseQuery>;
export type GetAllExamsQueryResult = Apollo.QueryResult<GetAllExamsQuery, GetAllExamsQueryVariables>;
export const DeleteExamDocument = gql`
    mutation DeleteExam($id: String!) {
  deleteExam(id: $id)
}
    `;
export type DeleteExamMutationFn = Apollo.MutationFunction<DeleteExamMutation, DeleteExamMutationVariables>;

/**
 * __useDeleteExamMutation__
 *
 * To run a mutation, you first call `useDeleteExamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExamMutation, { data, loading, error }] = useDeleteExamMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExamMutation, DeleteExamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExamMutation, DeleteExamMutationVariables>(DeleteExamDocument, options);
      }
export type DeleteExamMutationHookResult = ReturnType<typeof useDeleteExamMutation>;
export type DeleteExamMutationResult = Apollo.MutationResult<DeleteExamMutation>;
export type DeleteExamMutationOptions = Apollo.BaseMutationOptions<DeleteExamMutation, DeleteExamMutationVariables>;
export const GetAllRevisionPlansDocument = gql`
    query GetAllRevisionPlans {
  getAllRevisionPlans {
    id
    title
    startDate
    endDate
    tasks {
      id
      title
      type
      scheduledAt
      duration
    }
  }
}
    `;

/**
 * __useGetAllRevisionPlansQuery__
 *
 * To run a query within a React component, call `useGetAllRevisionPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRevisionPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRevisionPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRevisionPlansQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRevisionPlansQuery, GetAllRevisionPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRevisionPlansQuery, GetAllRevisionPlansQueryVariables>(GetAllRevisionPlansDocument, options);
      }
export function useGetAllRevisionPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRevisionPlansQuery, GetAllRevisionPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRevisionPlansQuery, GetAllRevisionPlansQueryVariables>(GetAllRevisionPlansDocument, options);
        }
export function useGetAllRevisionPlansSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllRevisionPlansQuery, GetAllRevisionPlansQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllRevisionPlansQuery, GetAllRevisionPlansQueryVariables>(GetAllRevisionPlansDocument, options);
        }
export type GetAllRevisionPlansQueryHookResult = ReturnType<typeof useGetAllRevisionPlansQuery>;
export type GetAllRevisionPlansLazyQueryHookResult = ReturnType<typeof useGetAllRevisionPlansLazyQuery>;
export type GetAllRevisionPlansSuspenseQueryHookResult = ReturnType<typeof useGetAllRevisionPlansSuspenseQuery>;
export type GetAllRevisionPlansQueryResult = Apollo.QueryResult<GetAllRevisionPlansQuery, GetAllRevisionPlansQueryVariables>;
export const GetSubjectsDocument = gql`
    query GetSubjects {
  getSubjects {
    id
    name
    color
    icon
  }
}
    `;

/**
 * __useGetSubjectsQuery__
 *
 * To run a query within a React component, call `useGetSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetSubjectsQuery, GetSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(GetSubjectsDocument, options);
      }
export function useGetSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectsQuery, GetSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(GetSubjectsDocument, options);
        }
export function useGetSubjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSubjectsQuery, GetSubjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(GetSubjectsDocument, options);
        }
export type GetSubjectsQueryHookResult = ReturnType<typeof useGetSubjectsQuery>;
export type GetSubjectsLazyQueryHookResult = ReturnType<typeof useGetSubjectsLazyQuery>;
export type GetSubjectsSuspenseQueryHookResult = ReturnType<typeof useGetSubjectsSuspenseQuery>;
export type GetSubjectsQueryResult = Apollo.QueryResult<GetSubjectsQuery, GetSubjectsQueryVariables>;
export const GetTasksDocument = gql`
    query GetTasks {
  getAllTasks {
    id
    title
    type
    scheduledAt
    duration
    done
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export function useGetTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksSuspenseQueryHookResult = ReturnType<typeof useGetTasksSuspenseQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetTasksByDateDocument = gql`
    query GetTasksByDate($date: String!) {
  getTasksByDate(date: $date) {
    id
    title
    scheduledAt
    type
    duration
    done
  }
}
    `;

/**
 * __useGetTasksByDateQuery__
 *
 * To run a query within a React component, call `useGetTasksByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksByDateQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetTasksByDateQuery(baseOptions: Apollo.QueryHookOptions<GetTasksByDateQuery, GetTasksByDateQueryVariables> & ({ variables: GetTasksByDateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksByDateQuery, GetTasksByDateQueryVariables>(GetTasksByDateDocument, options);
      }
export function useGetTasksByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksByDateQuery, GetTasksByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksByDateQuery, GetTasksByDateQueryVariables>(GetTasksByDateDocument, options);
        }
export function useGetTasksByDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTasksByDateQuery, GetTasksByDateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTasksByDateQuery, GetTasksByDateQueryVariables>(GetTasksByDateDocument, options);
        }
export type GetTasksByDateQueryHookResult = ReturnType<typeof useGetTasksByDateQuery>;
export type GetTasksByDateLazyQueryHookResult = ReturnType<typeof useGetTasksByDateLazyQuery>;
export type GetTasksByDateSuspenseQueryHookResult = ReturnType<typeof useGetTasksByDateSuspenseQuery>;
export type GetTasksByDateQueryResult = Apollo.QueryResult<GetTasksByDateQuery, GetTasksByDateQueryVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: String!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;