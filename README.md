# CountAPI Action
Use (CountAPI)[https://countapi.xyz/] in your GitHub actions

## Examples

### Hit
```
- name: Increment build number
    id: build_number
    uses: owenandrews/countapi-action@main
    with:
        namespace: example.com
        key: build-number
```
and then access the result in a following step with `${{ steps.build_number.outputs.result.value }}`
