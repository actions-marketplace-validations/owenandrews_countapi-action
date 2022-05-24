# CountAPI Action
Use [CountAPI](https://countapi.xyz/) in your GitHub actions. Useful for persisting counts between action runs and across workflows. Not affiliated with CountAPI.

## Examples

### Hit
Increment a key by one. If the key does not exist, a new key will be created at set to 1.
```yaml
- name: Increment build number
    id: build_number
    uses: owenandrews/countapi-action@v1.0
    with:
        namespace: example.com #required
        key: build-number #required
```
and then access the result in a following step with `${{ steps.build_number.outputs.result.value }}`.  

Example result:
```js
{
    status: 200,
    path: "example.com/build-number",
    value: 27
}
```

### Create
Create a new key with a number of optional parameters.
> ℹ️ If you'd just like to increment a number you can use the `hit` method, it will create a new key if one does not already exist.
```yaml
- name: Example create counter
  uses: owenandrews/countapi-action@v1.0
  with:
    method: create
    namespace: example.com #required
    key: build-number #required
    value: 10 #optional
    enable_reset: true #optional
    update_lowerbound: 2 #optional
    update_upperbound: 4 #optional
```
Example result:
```js
{
  status: 200,
  path: "example.com/build-number",
  namespace: "example.com",
  key: "build-number",
  value: 10
}
```

### Update
Increment or decrement an existing key by a certain amount.
```yaml
- name: Example update counter
  uses: owenandrews/countapi-action@v1.0
  with:
    method: update
    namespace: example.com #required
    key: build-number #required
    amount: 10 #optional
```
> ℹ️ `amount` must be within `update_lowerbound` and `update_upperbound` specified during the creation of the key.

Example result:
```js
{
  status: 200,
  path: "mysite.com/test",
  value: 42
}
```
> ⚠️ If the amount provided is invalid you will get status 403, but the step will still succeed.

### Set
Set a key to an arbitary value.
```yaml
- name: Example set counter
  uses: owenandrews/countapi-action@v1.0
  with:
    method: set
    namespace: example.com #required
    key: build-number #required
    value: 5 #optional
```
> ℹ️ To set a key, it must be created with `enable_reset` set to true.

Example result:
```js
{
  status: 200,
  path: "example.com/build-number",
  old_value: 136,
  value: 5
}
```
> ⚠️ If the key has `enable_reset` set to `false`, status will be 403 and the `old_value` will match `value` (the key stays the same). The step will still succeed.

### Get
```yaml
- name: Example get counter
  uses: owenandrews/countapi-action@v1.0
  with:
    method: get
    namespace: example.com #required
    key: build-number #required
```
Example result:
```js
{
  status: 200,
  path: "example.com/build-number",
  value: 136
}
```

### Info
Retrive information about a key.
```yaml
- name: Example get counter info
  uses: owenandrews/countapi-action@v1.0
  with:
    method: info
    namespace: example.com #required
    key: build-number #required
```
Example result:
```js
{
  status: 200,
  path: "example.com/build-number",
  namespace: "example.com",
  key: "build-number",
  ttl: 15769998014,
  created: 1553794487479,
  update_lowerbound: 0,
  update_upperbound: 1,
  enable_reset: false,
  value: 79
}
```

### Stats
Get some CountAPI stats.
```yaml
- name: Example get global CounterAPI stats
  uses: owenandrews/countapi-action@v1.0
  with:
    method: stats
    namespace: example.com #required, but not used
    key: build-number #required, but not used
```
Example result:
```js
{
  keys_created: 111111,
  keys_updated: 111111,
  requests: 111111,
  version: "xxxxxx"
}
```
