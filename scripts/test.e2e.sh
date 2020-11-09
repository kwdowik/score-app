yarn docker:staging
count=0; until docker logs score-api | grep "Server is listening" &> /dev/null || (( count++ > 12 )); do echo "Waiting $count"; sleep 5; done
yarn test:e2e:in-container
yarn docker:clear
