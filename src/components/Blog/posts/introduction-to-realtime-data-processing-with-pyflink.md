Author: Thabang Mashinini

## What is Flink SQL

- Flink SQL is a feature of Apache Flink that allows users to execute SQL queries on streaming and batch data. It provides a way to write SQL-like queries in a familiar syntax and execute them against data streams or batch datasets. Flink SQL is built on top of the Flink engine, which provides the underlying processing framework for the SQL queries.

- Flink SQL supports ANSI SQL syntax, and it includes support for various SQL operations, such as window functions, grouping, filtering, and more. It can handle both structured and semi-structured data, and it supports various data formats, including JSON, CSV, Avro, and more.

- Using Flink SQL, users can easily analyze real-time streaming data, process it, and generate insights or results. They can also use it to transform batch data into streaming data for further processing.

Overall, Flink SQL provides a powerful way to process and analyze streaming and batch data with SQL-like queries, making it an essential tool for data engineers and data scientists.

## Components of flink SQL
The PyFlink API includes several components that allow users to build scalable data processing pipelines:

- **Flink Table API:** The Table API provides a way to express data transformations using SQL-like queries. It is an abstraction layer on top of the Flink engine that provides a more user-friendly way to express data processing pipelines.

- **Flink SQL:** Flink SQL is a feature of Apache Flink that allows users to execute SQL queries on streaming and batch data. It provides a way to write SQL-like queries in a familiar syntax and execute them against data streams or batch datasets.

- **Flink Streaming API:** The Streaming API provides a way to process real-time data streams with low latency and high throughput. It supports various data sources, including Kafka, Kinesis, and more.

- **Flink Batch API:** The Batch API provides a way to process batch data using the Flink engine. It can process large datasets efficiently in a distributed environment.


- **Flink Machine Learning Library (FlinkML):** FlinkML is a library that provides machine learning algorithms for Flink. It includes support for various machine learning tasks, such as classification, clustering, regression, and more.

- **Flink Table Formats:** Flink Table Formats provide a way to handle various data formats such as CSV, JSON, Avro, Parquet and ORC files in Flink.

## Potential Usecases:

- **Alert enrichment:** You can use Flink SQL to enrich the raw Netcool alarm data with additional information from other sources, such as customer profiles or device metadata. This can help you gain a better understanding of the context and severity of each alarm and take appropriate action.

- **Anomaly detection:** You can use Flink SQL to detect anomalies in the Netcool alarms stream by comparing incoming data against historical patterns or baseline values. This can help you identify potential issues before they cause service disruptions or downtime.

- **Threshold monitoring:** You can use Flink SQL to monitor specific thresholds or performance metrics, such as response time or network latency, and trigger alerts or actions when those thresholds are exceeded. This can help you proactively manage and optimize your network and service performance.

- **Root cause analysis:** You can use Flink SQL to analyze the Netcool alarms stream and identify the root cause of service disruptions or other issues. By correlating different alarms or events, you can gain a better understanding of the underlying causes and take corrective actions.

- **Real-time dashboarding:** You can use Flink SQL to build real-time dashboards that display key performance indicators (KPIs) or other metrics based on the Netcool alarms stream. This can help you monitor your network and service performance in real-time and make data-driven decisions.
________
# USE-CASES

* Netcool is an IBM software product that provides network and service management capabilities, including event management, fault management, and performance management. 
_______


### Filtering and aggregations:
1. Filter by Atoll ID: To filter the alarms by Atoll ID, you can use the following query:

    ```sql
    SELECT *
    FROM netcool_alarms
    WHERE atoll_id = 'some_id';
    ````
   This query selects all alarms with a specific Atoll ID.

2. Count alarms by severity: To count the number of alarms by severity level, you can use the following query:
    ```sql
    SELECT severity, COUNT(*) as num_alarms
    FROM netcool_alarms
    GROUP BY severity;
    ````
    This query groups the alarms by severity level and counts the number of alarms in each group

3. Calculate average time between occurrences: To calculate the average time between occurrences of each alarm type, you can use the following query:
    ```sql
    SELECT alarm_type,
        AVG(TIMESTAMPDIFF(SECOND, firstoccurrence, 
        lastoccurrence)) as avg_time_between
    FROM netcool_alarms
    GROUP BY alarm_type;
    ````
    This query calculates the time difference between the first and last occurrence of each alarm type, and then calculates the average time between occurrences for each alarm type.

4. Identify alarm patterns: To identify patterns or trends in the alarms stream, you can use the following query:

    ```sql
    SELECT alarm_type, DATE_FORMAT(firstoccurrence, '%Y-%m-%d %H:%i')
     as occurrence_time, COUNT(*) as num_alarms
    FROM netcool_alarms
    GROUP BY alarm_type, occurrence_time;
    ````
    This query groups the alarms by alarm type and occurrence time (rounded to the nearest minute), and counts the number of alarms in each group. By visualizing this data over time, you can identify patterns or trends in the alarms stream.


### Side inputs:
- In Apache Flink, side inputs are a feature of the DataStream and DataSet APIs that allow you to access data that is not part of the main data stream or dataset that is being processed. Side inputs are often used to perform additional calculations or enrich the main data with additional context or metadata.

- A side input is a data stream or dataset that is read-only and shared across all parallel instances of a function or operator. Side inputs are typically loaded from an external data source, such as a database, file system, or streaming source, and are cached in memory for efficient access.

- Side inputs can be used in conjunction with user-defined functions (UDFs) in Flink to perform complex calculations or enrichments on the main data stream
- Here are some examples of when side inputs might be useful:

  - Lookups: You might have a lookup table that maps IDs to names, and you want to include the names in your output stream based on the IDs in your input stream.

  - Configuration: You might have configuration data that affects how you process your data stream, such as thresholds, rules, or parameters.

  - Calibration: You might have calibration data that helps you adjust or correct your measurements, such as reference values or correction factors.
-  One important thing to keep in mind when using side inputs is that they introduce additional complexity and potential sources of error in your code. You need to carefully manage the lifecycle of your side input data, ensure that it is properly initialized and cleaned up, and handle any exceptions or failures that may occur during its processing.

examples of how you can use a side input containing ranking scores, latitude, and longitude for each atoll in combination with the Netcool alarms stream in Flink SQL:

1. **Database side input:** If your side input data is stored in an Oracle database, you can use the `jdbc` connector in Flink SQL to read the data into a temporary table and use it within your Flink SQL query. Here's an example of how to define a temporary table to read the side input data from Oracle:
   
    ```sql
        CREATE TEMPORARY TABLE site_ranker (
        atoll_id STRING,
        ranking_score DOUBLE,
        latitude DOUBLE,
        longitude DOUBLE
        ) WITH (
        'connector' = 'jdbc',
        'url' = 'jdbc:oracle:thin:@//hostname:port/service',
        'table-name' = 'atoll_data',
        'username' = '<username>',
        'password' = '<password>',
        'lookup.cache.max-rows' = '5000'
        );
    ```
    In this example, we're creating a table called atoll_data that references an Oracle database. We're specifying the JDBC connection parameters in the WITH clause, including the URL, table name, username, and password. We're also setting the lookup.cache.max-rows option to 5000, which specifies the maximum number of rows to cache in memory for the side input table.

    Once you have defined the temporary table, you can use it in your Flink SQL query to join the Netcool alarms stream with the atoll data stream:

    ```sql
        SELECT
            a.*,
            ad.ranking_score,
            ad.latitude,
            ad.longitude
        FROM
            netcool_alarms a
        JOIN atoll_data ad ON a.atoll_id = ad.atoll_id;
    ```


2. **Filesystem side input:**  You can define the side input table using the CREATE TABLE statement in Flink SQL, specifying the schema of the CSV file and the file path. Here's an example of how to define the side input table:
    ```sql
    CREATE TABLE atoll_ranking (
        atoll_id STRING,
        ranking_score INT,
        latitude DOUBLE,
        longitude DOUBLE
    ) WITH (
        'connector' = 'filesystem',
        'path' = 'file:///path/to/atoll_ranking.csv',
        'format' = 'csv'
    );
    ```
    Join the side input table with the Netcool alarms stream: You can use a join operation to combine the Netcool alarms stream with the side input table, based on the atoll_id column. Here's an example of how to join the two tables:
   ```sql
    SELECT a.*, r.ranking_score, r.latitude, r.longitude
    FROM alarms a
    JOIN atoll_ranking FOR SYSTEM_TIME AS OF PROCTIME() r ON a.atoll_id = r.atoll_id
    );
    ```

    This query selects all columns from the alarms table and adds the ranking_score, latitude, and longitude columns from the atoll_ranking table, joined on the atoll_id column. The ``FOR SYSTEM_TIME AS OF PROCTIME()`` clause specifies that Flink should use the latest version of the atoll_ranking table that is valid as of the current processing time.

    - Use the side input data in calculations or transformations: Once you have joined the side input data with the Netcool alarms stream, you can use the additional columns in your calculations or transformations. For example, you could calculate the distance between each alarm and its associated atoll using the latitude and longitude columns from both tables:

        ```sql
        SELECT a.*, r.ranking_score, r.latitude, r.longitude,
            ST_Distance(ST_Point(a.latitude, a.longitude), 
            ST_Point(r.latitude, r.longitude)) AS distance_to_atoll
        FROM alarms a
        JOIN atoll_ranking FOR SYSTEM_TIME AS OF PROCTIME() r ON a.atoll_id = r.atoll_id
        ```
        This query calculates the distance between each alarm's coordinates and its associated atoll's coordinates using the ``ST_Distance`` function provided by Flink's Spatial extension. The ``ST_Point`` function is used to construct points from the latitude and longitude columns of both tables, and the resulting distance is added as a new column to the output.

### User Defined Functions (UDF):
Flink UDFs (User-Defined Functions) are custom functions that you can write and use in your Flink SQL or DataStream applications. These functions allow you to implement custom business logic and extend the functionality of Flink beyond its built-in capabilities.

1. Machine Learning:
   - To apply a Python-trained machine learning model on the stream of Netcool alarms in Flink SQL, you can use the PyFlink library. Here is an example of a batch trained anomaly model:
     - First, you need to load your trained model in a Python script. Here's an example of loading an isolation forest model from the Scikit-learn library:
        ```python
            from sklearn.ensemble import IsolationForest
            model = IsolationForest()
            model.load('path/to/model.pkl')
        ```
        - Next, you need to define a Python UDF that takes the relevant features from each Netcool alarm as input, applies the trained model, and returns a Boolean value indicating whether the alarm is anomalous or not. Here's an example of defining such a UDF:

         ```python
        from pyflink.table.udf import udf
        from pyflink.table import DataTypes

        @udf(result_type=DataTypes.BOOLEAN())
        def is_anomalous(atoll_id, alarm_type, alarm_severity):
            # Apply the trained model to the relevant features
            features = [atoll_id, alarm_type, alarm_severity]
            is_anomalous = model.predict([features])[0] == -1
        return is_anomalous
        ```
        - In this example, the UDF takes the atoll_id, alarm_type, and alarm_severity columns from the Netcool alarm stream as input, and applies the trained isolation forest model to these features. The is_anomalous variable is set to True if the model predicts that the alarm is anomalous (i.e., the predicted value is -1), and False otherwise.

   - Finally, you can use the UDF in a Flink SQL query to add a new column to the Netcool alarm stream that indicates whether each alarm is anomalous or not. Here's an example of such a query:




    ```SQL
        -- Register the Python module containing the UDF definition
        REGISTER FUNCTION is_anomalous AS 'my_module.is_anomalous' LANGUAGE PYTHON;

        SELECT *,
            is_anomalous(atoll_id, alarm_type, alarm_severity) AS is_anomalous
        FROM netcool_alarms;
    ```

    - This query adds a new column to the Netcool alarm stream called is_anomalous, which contains Boolean values indicating whether each alarm is anomalous or not, based on the output of the is_anomalous UDF.
    - Here, ```my_module``` is a Python file where Python UDFs functions are defined, like ```is_anomalous``` function.
    - In general, the key is to ensure that the path specified in the REGISTER FUNCTION statement points to the correct location of your Python module containing the UDF function.
    - 
### Time-Based Processing


   1. **Tumbling Windows:** Tumbling windows divide the stream into non-overlapping time intervals called windows. All events that fall into a particular window are grouped together, and you can perform aggregations on the events within the window. For example, you can compute the total count of alarms in each hour-long window. Tumbling windows have a fixed length and slide at fixed intervals. You can define them in Flink SQL using the TUMBLE function:

        ```SQL
        SELECT
            atoll_id,
            TUMBLE_START(firstoccurrence, INTERVAL '5' MINUTE) as window_start,
            COUNT(*) as alarm_count
        FROM netcool_alarms
        GROUP BY atoll_id, TUMBLE(firstoccurrence, INTERVAL '5' MINUTE)
        ```
        - In this example, we are grouping the Netcool Alarms stream by atoll_id and a 5-minute Tumbling Window. The TUMBLE_START function specifies the starting timestamp of the Tumbling Window for each group.

        - The COUNT(*) function counts the number of alarms within each Tumbling Window for each atoll. This way, we can get a sense of how many alarms are happening in each 5-minute window.

        - Essentially, Tumbling Windows allow us to group and analyze data within specific time intervals, in this case, 10-minute intervals. This can be useful for monitoring trends and identifying patterns in the Netcool Alarms stream
   
   2. **Sliding Windows:** Sliding windows are similar to tumbling windows, but they can overlap. You can slide a window over the stream at regular intervals, so events may belong to multiple windows. Sliding windows are useful for computing metrics over a rolling time period, such as the average severity of alarms over the last 5 minutes. You can define sliding windows in Flink SQL using the HOP function. 
   
      -  Suppose we want to calculate the average severity level of alarms in a sliding window of 5 minutes with a slide interval of 1 minute. We can define a sliding window by specifying the window size and slide interval, and then use an aggregate function to compute the average severity level within each window.

            ```SQL
           -- Define the sliding window with a window size of 5 minutes and slide interval of 1 minute
            CREATE VIEW sliding_window AS
            SELECT TUMBLE_START(event_time, INTERVAL '5' MINUTE) AS window_start, 
                TUMBLE_END(event_time, INTERVAL '5' MINUTE) AS window_end, 
                HOP_START(event_time, INTERVAL '1' MINUTE, INTERVAL '5' MINUTE) AS slide_start, 
                HOP_END(event_time, INTERVAL '1' MINUTE, INTERVAL '5' MINUTE) AS slide_end, 
                atoll_id, 
                alarm_severity
            FROM netcool_alarms;

            -- Calculate the average severity level within each sliding window
            SELECT slide_start, slide_end, AVG(alarm_severity) AS avg_severity
            FROM sliding_window
            GROUP BY slide_start, slide_end;
            ``` 

           - In this example, we first create a view called sliding_window that defines the sliding window with a window size of 5 minutes and a slide interval of 1 minute. We use the ``TUMBLE_START`` and ``TUMBLE_END`` functions to define the boundaries of the tumbling window, and the ``HOP_START`` and ``HOP_END`` functions to define the boundaries of the sliding window, intuively it creates windows of 1 minute size that slide every 5 minutes, and to use the 'event_time' column to determine the end time of each window
           - In Flink SQL, event time is a concept that refers to the time at which an event occurred or was generated. It is often used in streaming data processing to order and group events based on their actual occurrence time.

           - In the context of Netcool alarms, the event time represents the timestamp at which an alarm was generated or occurred. It is different from the "first occurrence" timestamp because it refers to the actual time the event took place, whereas "first occurrence" refers to the first time the event was detected or reported by the system.

  1. **Session Windows:** Session windows group events together based on their arrival time and the time between them. Events that are close together in time are considered part of the same session. When the time between two events exceeds a certain threshold, the current session is closed and a new one begins. Session windows are useful for identifying patterns in user behavior, such as identifying when a user is inactive. You can define session windows in Flink SQL using the SESSION function.

       ```SQL
        SELECT 
            ALARM_ID,
            TUMBLE_START(event_time, INTERVAL '5' MINUTE) AS session_start,
            TUMBLE_END(event_time, INTERVAL '5' MINUTE) AS session_end,
            COUNT(*) AS num_alarms
        FROM netcool_alarms
        GROUP BY 
            ALARM_ID,
        SESSION(event_time, INTERVAL '10' MINUTE)
        ```

        - In this example, we're grouping the alarms by their ALARM_ID and by a session window defined as events that occur within 10 minutes of each other. The TUMBLE_START and TUMBLE_END functions are used to determine the start and end of each session window, which is set to 5 minutes.

        - The COUNT function is used to count the number of alarms that occur within each session window.

        - Overall, this query will group alarms into sessions based on a timeout period of 10 minutes, and calculate the start and end time of each session window while also counting the number of alarms that fall within each session.
          - So, for example, if we had a bunch of alarms occurring at different times, like this:

                Alarm A occurred at 9:00am
                Alarm B occurred at 9:03am
                Alarm C occurred at 9:05am
                Alarm D occurred at 9:20am
                Alarm E occurred at 9:25am

                Then the computer would group these alarms into two 
                sessions, based on the 10-minute interval we specified:

                    Session 1: Alarms A, B, and C, because they all occurred 
                    within 10 minutes of each other
                    Session 2: Alarms D and E, because they occurred more than 10 
                    minutes after the previous alarm

                This can be useful for analyzing patterns in our Netcool alarms data, because it 
                lets us see how alarms are related to each other based on when they occur.

  2. **Event Time Processing:** Event time processing is used when you want to perform computations based on the timestamps that are associated with the events in the stream, rather than the processing time. This is useful when events may arrive out of order or with delays. You can define event time processing in Flink SQL using the WATERMARK function.

   - TODO

### Data Sinks:
Flink data sinks are the output destinations where Flink writes the processed data. Once the data is processed by Flink, it needs to be written to a persistent storage or a destination where it can be consumed by other systems. Flink supports various data sinks, including file systems, databases, message queues, and custom sinks.

Some of the popular data sinks in Flink include:

 - **File systems:** Flink supports writing data to various file systems such as HDFS, S3, and local file systems.

- **Databases:** Flink can write data to different databases such as MySQL, PostgreSQL, and Apache Cassandra using JDBC or custom connectors.

- **Message queues:** Flink can write data to message queues such as Apache Kafka, RabbitMQ, and Amazon Kinesis using built-in or custom connectors.

- **Custom sinks:** Flink also allows users to write their own custom sinks by implementing the SinkFunction interface or by using Flink’s connector API.

### FAQs:
1. Where is the optimal place to apply  data transformations and preprocessing in a stream using flink. Should I do in the create table or flink sql after creating the table and does it  impact compute and recovery?
     - One approach is to apply data transformations and preprocessing during the stream processing pipeline. This can be done in Flink's DataStream API, where you can perform operations such as filtering, mapping, and aggregation on the stream data before sending it to the table API or SQL API. This approach can be useful for complex transformations that cannot be easily expressed in the table or SQL API.

   - Alternatively, you can apply data transformations and preprocessing in the table or SQL API. This can be done by using user-defined functions (UDFs) or by writing custom table functions. This approach can be useful for simpler transformations that can be easily expressed in SQL or the table API.

   - Both approaches can impact compute and recovery. If you perform transformations and preprocessing in the stream processing pipeline, it may impact the performance of the pipeline since it is doing additional work. On the other hand, if you apply transformations and preprocessing in the table or SQL API, it may impact the performance of the queries since they are doing additional work.

   - In terms of recovery, both approaches can affect the ability to recover from failures. If transformations and preprocessing are applied in the stream processing pipeline, Flink will automatically recover the pipeline from failures. However, if transformations and preprocessing are applied in the table or SQL API, you may need to take additional steps to ensure recovery, such as checkpointing and configuring stateful UDFs to be fault-tolerant.

### Reference
- Apache Flink documentation: https://flink.apache.org/
- Flink SQL documentation: https://ci.apache.org/projects/flink/flink-docs-release-1.14/docs/dev/table/sql/
- Netcool documentation: https://www.ibm.com/docs/en/netcool-omnibus/8.1?topic=guide-overview-netcool-omnibus
- Anomaly detection with Flink SQL: https://ververica.com/blog/anomaly-detection-with-flink-sql
- Flink SQL Python UDF documentation: https://ci.apache.org/projects/flink/flink-docs-release-1.14/docs/dev/table/udfs/python/
- Flink SQL Time-based windows documentation: https://ci.apache.org/projects/flink/flink-docs-release-1.14/docs/dev/table/concepts/time_attributes/
- Flink SQL Session window documentation: https://ci.apache.org/projects/flink/flink-docs-release-1.14/docs/dev/table/concepts/time_attributes/#session-windows
- Flink SQL Sliding window documentation: https://ci.apache.org/projects/flink/flink-docs-release-1.14/docs/dev/table/concepts/time_attributes/#sliding-windows
- Flink SQL Tumbling window documentation: https://ci.apache.org/projects/flink/flink-docs-release-1.14/docs/dev/table/concepts/time_attributes/#tumbling-windows
- Flink SQL data sinks documentation: https://ci.apache.org/projects/flink/flink-docs-release-1.14/docs/dev/table/connectors/sinks/
- Flink SQL event time processing documentation: https://ci.apache.org/projects/flink/flink-docs-release-1.14/docs/dev/table/streaming/time_attributes/
- Flink data sources documentation: https://ci.apache.org/projects/flink/flink-docs-release-1.14/docs/connectors/datastream/