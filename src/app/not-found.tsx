import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="not-found">
      <span>404</span>
      <h1>문서를 찾을 수 없습니다.</h1>
      <p>주소를 확인하거나 문서의 첫 페이지로 이동하세요.</p>
      <Link href="/">Design Guide로 돌아가기 →</Link>
    </main>
  );
}
