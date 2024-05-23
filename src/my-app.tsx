// Todo 인터페이스 정의
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// 단일 Todo 항목 가져오기
export const getTodo = async (): Promise<Todo> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  if (!response.ok) {
    console.error("Network response was not ok", response.statusText);
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log("Fetched Todo:", data); // 디버깅용 콘솔 로그
  return data;
};

// 새로운 Todo 항목 추가
export const postTodo = async (todo: Partial<Todo>): Promise<Todo> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    console.error("Network response was not ok", response.statusText);
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log("Posted Todo:", data); // 디버깅용 콘솔 로그
  return data;
};
