package com.learning.service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.learning.model.BucketToken;
import com.learning.model.TokenDetails;
import com.learning.repository.BucketRepository;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;

@Service
public class EmailService {
	Bandwidth band;

	@Autowired
	BucketRepository bucketRepository;

	public Boolean getTokenByUser(String user) {
		// check whether the user is present or not
		Optional<BucketToken> checkkUser = bucketRepository.findByUsername(user);
		if (checkkUser.isPresent()) {

			BucketToken userData = checkkUser.get();

			// compare date of today and token generated date

			if (userData.getGeneratedDate().equals(LocalDate.now())) {

				TokenDetails token = checkkUser.get().getState();

				// if avaliable token is 0 which means the reached the limit of the day
				if (token.getAvailableTokens() != 0) {
					Bandwidth newBandwidth = Bandwidth.classic(token.getAvailableTokens(),
							Refill.intervally(2, Duration.ofNanos(token.getRefillPeriodNanos())));
					Bucket bucket = Bucket4j.builder().addLimit(newBandwidth).build();
					System.out.println(newBandwidth.getCapacity());

					boolean accessable = bucket.tryConsume(1);
					System.out.println(accessable);
					if (accessable) {

						token.setAvailableTokens(bucket.getAvailableTokens());
						userData.setState(token);
						System.out.println(bucket.getAvailableTokens());
						bucketRepository.save(userData);
					}
					return accessable;
				} else {
					return false;
				}
			} else {
				TokenDetails token = new TokenDetails();
				generateNewBucket(userData, 9l, Duration.ofDays(1).toNanos(), token);
				return true;
			}

		} else {
			BucketToken userData = new BucketToken();
			TokenDetails token = new TokenDetails();
			userData.setUsername(user);
			generateNewBucket(userData, 10l, Duration.ofMinutes(1).toNanos(), token);
			return true;

		}
	}

	private void generateNewBucket(BucketToken userData, long capacity, long duration, TokenDetails token) {
		Bandwidth newBandwidth = Bandwidth.classic(capacity, Refill.intervally(2, Duration.ofNanos(duration)));
		Bucket bucket = Bucket4j.builder().addLimit(newBandwidth).build();

		BeanUtils.copyProperties(newBandwidth, token);

		userData.setGeneratedDate(LocalDate.now());
		token.setAvailableTokens(bucket.getAvailableTokens());
		userData.setState(token);
		bucketRepository.save(userData);
	}

}
