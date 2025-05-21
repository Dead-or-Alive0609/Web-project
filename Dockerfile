# Step 1: Nginx 베이스 이미지
FROM nginx:alpine

# Step 2: 사용자 정의 nginx.conf 복사
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/mime.types /etc/nginx/mime.types

# Step 3: React 빌드 결과물 복사
COPY ./build /usr/share/nginx/html

# Step 4: 포트 노출
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
