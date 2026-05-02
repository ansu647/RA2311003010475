# Stage 1: Notification Priority System

---

## Approach

Notifications are prioritized based on two main factors:

1. **Type Priority**

   * Placement (highest priority)
   * Result (medium priority)
   * Event (lowest priority)

2. **Recency**

   * Latest notifications are given higher importance than older ones

The system ensures that critical notifications (like placements) always appear before less important ones, even if they are older.

---

## Algorithm

A priority score is assigned to each notification using:

```
score = weight * constant + timestamp
```

Where:

* Weight is assigned based on type:

  * Placement = 3
  * Result = 2
  * Event = 1
* Timestamp ensures newer notifications are ranked higher

### Steps:

1. Fetch notifications from API
2. Assign weight based on notification type
3. Compute score using timestamp
4. Sort notifications in descending order
5. Select top N notifications

---

## Complexity

* Fetching data: **O(n)**
* Sorting: **O(n log n)**
* Filtering: **O(n)**

### Overall Complexity:

**O(n log n)**

---

## Optimization

Instead of sorting the entire dataset:

* Use a **Min Heap of size N**
* Maintain only top N elements

### Optimized Complexity:

**O(n log N)**

---

## Logging Middleware

Logging is implemented to track system behavior:

### Logs include:

* API request start
* Data fetched successfully
* Sorting completed
* Error handling

### Function used:

```
Log(stack, level, package, message)
```

---

## Edge Cases Handled

* Empty notification list
* Invalid or expired token
* Unknown notification types
* Large dataset handling

---

## Conclusion

The system efficiently prioritizes notifications by combining:

* Type-based importance
* Time-based recency

This ensures that users always see the most relevant and critical notifications first.
