import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getTodo, postTodo } from "./my-app";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  );
};

const Todos = () => {
  // QueryClient 접근
  const queryClient = useQueryClient();

  // useQuery 사용
  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodo,
  });

  // useMutation 사용
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // 쿼리 무효화 및 재가져오기
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // data가 배열인지 확인
  const todos = Array.isArray(data) ? data : [];

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: "Do Laundry",
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default App;
