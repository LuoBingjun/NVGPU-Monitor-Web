import pynvml

def init_nvml():
    pynvml.nvmlInit()

def shutdown_nvml():
    pynvml.nvmlShutdown()

def get_gpu_count():
    return pynvml.nvmlDeviceGetCount()

def get_gpu_info(gpu_id, memory=True, process=True, power=True):
    ret = {}
    handle = pynvml.nvmlDeviceGetHandleByIndex(gpu_id)
    ret['name'] = pynvml.nvmlDeviceGetName(handle).decode()
    if memory:
        info = pynvml.nvmlDeviceGetMemoryInfo(handle)
        ret['memory'] = {
            "total": info.total,
            "free": info.free,
            "used": info.used
        }
    if process:
        info_list = pynvml.nvmlDeviceGetComputeRunningProcesses(handle)
        ret['process'] = [info.__dict__ for info in info_list]
    if power:
        ret['power'] = {
            "limit": pynvml.nvmlDeviceGetPowerManagementLimit(handle),
            "usage": pynvml.nvmlDeviceGetPowerUsage(handle),
            "state": pynvml.nvmlDeviceGetPowerState(handle)
        } 
        ret['temp'] = pynvml.nvmlDeviceGetTemperature(handle, 0)
        ret['fan_speed'] = pynvml.nvmlDeviceGetFanSpeed(handle)
    return ret

def get_gpus_info(gpus=None, **kwargs):
    if not gpus:
        gpu_count = get_gpu_count()
        gpus = list(range(gpu_count))

    ret = {}

    for gpu_id in gpus:
        ret[gpu_id] = get_gpu_info(gpu_id, **kwargs)

    return ret

if __name__ == '__main__':
    init_nvml()
    data = get_gpus_info()
    shutdown_nvml()
    pass