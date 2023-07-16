/*
 *
 */
package com.daimler.schematicbackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

/**
 * The Class SchematicAsyncConfig.
 */
@Configuration
@EnableAsync
public class SchematicAsyncConfig {

    /**
     * The pool size.
     */
    @Value("${schematic.async.poolSize}")
    private int poolSize;

    /**
     * The queue capacity.
     */
    @Value("${schematic.async.queueCapacity}")
    private int queueCapacity;

    /**
     * Async executor.
     *
     * @return the task executor
     */
    @Bean(name = "schematicAsyncExcelExecutor")
    public TaskExecutor asyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(poolSize);
        executor.setMaxPoolSize(poolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setThreadNamePrefix("schematicExcelPool");
        executor.initialize();
        return executor;
    }

}
